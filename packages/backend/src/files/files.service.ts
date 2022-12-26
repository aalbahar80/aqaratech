import { ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { accessibleBy } from '@casl/prisma';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

import {
	DBEntity,
	entitiesMap,
	fileCreateSchema,
	FileRelationKey,
} from '@self/utils';

import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { S3_TTL } from 'src/constants/s3-ttl';
import { CreateFileDto, FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class FilesService {
	constructor(
		private readonly s3: S3Service,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
		private readonly prisma: PrismaService,
	) {}

	private readonly logger = new Logger(FilesService.name);

	async create({
		createFileDto,
		file,
		organizationId,
	}: {
		createFileDto: Omit<CreateFileDto, 'file'>;
		file: Express.Multer.File;
		organizationId: string;
	}) {
		const key = this.computeFileKey({
			relationKey: createFileDto.relationKey,
			relationValue: createFileDto.relationValue,
			fileName: createFileDto.fileName,
		});

		const directory = this.getFileDirectory({ key });

		const bucket = organizationId;

		this.logger.debug(
			`Attempting to create file: ${key} in bucket: ${bucket} in directory: ${directory}`,
		);

		// bust cache for file and directory (prefix)
		this.logger.debug(`CACHE BUST: key: ${key}`);
		await this.cacheManager.del(key);
		await this.cacheManager.del(directory);

		const uploaded = await this.s3.putObject({
			Bucket: bucket,
			Key: key,
			Body: file.buffer,
			ContentType: file.mimetype,
		});
		this.logger.debug(uploaded);

		return createFileDto.fileName;
	}

	async findAll({
		user,
		// TODO: validate relationKey and relationValue
		relationKey,
		relationValue,
	}: {
		user: IUser;
		relationKey: FileRelationKey;
		relationValue: string;
	}): Promise<WithCount<FileDto>> {
		const bucket = this.getFileBucket({ user });

		await this.canAccess({
			relationKey,
			relationValue,
			user,
			action: Action.Read,
		});

		const directory = this.computeDirectoryKey({
			relationKey,
			relationValue,
		});

		type s3Objects = ListObjectsV2CommandOutput | undefined;
		let objects: s3Objects;

		// attempt to get from cache
		const cacheKey = directory;
		const cached = await this.cacheManager.get<s3Objects>(cacheKey);

		if (cached) {
			this.logger.debug(`CACHE HIT: files.findAll cacheKey: ${cacheKey}`);
			objects = cached;
		} else {
			this.logger.debug(`CACHE MISS: files.findAll cacheKey: ${cacheKey}`);

			// get fresh from s3
			objects = await this.s3.listObjects({
				Bucket: bucket,
				Prefix: directory,
			});

			// set cache
			if (objects !== undefined) {
				// setting cache to undefined causes CacheManager to throw.
				await this.cacheManager.set(cacheKey, objects, S3_TTL);
			}
		}

		return {
			total: objects?.KeyCount ?? 0,
			results: objects?.Contents?.map((e) => new FileDto(e)) ?? [],
		};
	}

	async findOne({ key, user }: { key: string; user: IUser }) {
		const bucket = this.getFileBucket({ user });

		const directory = this.getFileDirectory({ key });

		const { relationKey, relationValue } = this.getFileDetails({ directory });

		await this.canAccess({
			relationKey,
			relationValue,
			user,
			action: Action.Read,
		});

		// attempt to get from cache
		let presignedUrl: string;

		const cacheKey = key;
		const cached = await this.cacheManager.get<string>(cacheKey);

		if (cached) {
			this.logger.debug(`CACHE HIT: files.findOne cacheKey: ${cacheKey}`);
			presignedUrl = cached;
		} else {
			this.logger.debug(`CACHE MISS: files.findOne cacheKey: ${cacheKey}`);

			// get fresh from s3
			presignedUrl = await this.s3.getObject({
				Bucket: bucket,
				Key: key,
			});

			// set cache
			await this.cacheManager.set(cacheKey, presignedUrl, S3_TTL / 2);
		}

		return presignedUrl;
	}

	async remove({ key, user }: { key: string; user: IUser }) {
		const bucket = this.getFileBucket({ user });

		const directory = this.getFileDirectory({ key });

		const { relationKey, relationValue } = this.getFileDetails({ directory });

		await this.canAccess({
			relationKey,
			relationValue,
			user,
			action: Action.Update,
		});

		// bust cache for file and directory (prefix)
		this.logger.debug(`CACHE BUST: key: ${key} - directory: ${directory}`);
		await this.cacheManager.del(key);
		await this.cacheManager.del(directory);

		await this.s3.removeObject({
			Bucket: bucket,
			Key: key,
		});
	}

	async canAccess({
		relationKey,
		relationValue,
		user,
		action,
	}: {
		relationKey: DBEntity;
		relationValue: string;
		user: IUser;
		action: Action;
	}) {
		const entityMap = entitiesMap[relationKey];
		// @ts-expect-error - uniontype not cutting it
		await this.prisma[relationKey].findFirstOrThrow({
			where: {
				AND: [
					{ id: relationValue },
					accessibleBy(user.ability, action)[entityMap.caslName],
				],
			},
		});
	}

	computeFileKey({
		relationKey,
		relationValue,
		fileName,
	}: {
		// TODO: validate relationKey and relationValue upstream
		relationKey: FileRelationKey;
		relationValue: string;
		fileName: string;
	}) {
		const directory = this.computeDirectoryKey({
			relationKey,
			relationValue,
		});

		const key = `${directory}/${fileName}`;

		return key;
	}

	computeDirectoryKey({
		relationKey,
		relationValue,
	}: {
		// TODO: infer from file.schema
		relationKey: string;
		relationValue: string;
	}) {
		const key = `${relationKey}/${relationValue}`;

		return key;
	}

	getFileDirectory({ key }: { key: string }) {
		const directory = key.split('/').slice(0, -1).join('/');

		return directory;
	}

	// TODO: rename
	getFileDetails({ directory }: { directory: string }) {
		const schema = fileCreateSchema.pick({
			relationKey: true,
			relationValue: true,
		});

		return schema.parse({
			relationKey: directory.split('/')[0],
			relationValue: directory.split('/')[1],
		});
	}

	getFileBucket({ user }: { user: IUser }) {
		// TODO: organizationId is better gotten from the url param
		const bucket = user.role.organizationId;

		return bucket;
	}
}
