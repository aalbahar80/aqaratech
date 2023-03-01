import { ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import {
	CACHE_MANAGER,
	ForbiddenException,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import {
	DBEntity,
	entitiesMap,
	FileCreateSchema,
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
		user,
	}: {
		createFileDto: Omit<CreateFileDto, 'file'>;
		file: Express.Multer.File;
		organizationId: string;
		user: IUser;
	}) {
		// Check permission on 'File' entity
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Create,
			subject('File', {
				relationKey: createFileDto.relationKey,
				organizationId,
			}),
		);

		// check whether user can update the relation
		await this.canAccess({
			relationKey: createFileDto.relationKey,
			relationValue: createFileDto.relationValue,
			user,
			action: Action.Update,
		});

		const id = this.computeFileId({
			relationKey: createFileDto.relationKey,
			relationValue: createFileDto.relationValue,
			fileName: createFileDto.fileName,
		});

		const directory = this.getFileDirectory({ id: id });

		const bucket = organizationId;

		this.logger.debug(
			`Attempting to create file: ${id} in bucket: ${bucket} in directory: ${directory}`,
		);

		// bust cache for file and directory (prefix)
		this.logger.debug(`CACHE BUST: id: ${id}`);
		await this.cacheManager.del(id);
		await this.cacheManager.del(directory);

		const uploaded = await this.s3.putObject({
			Bucket: bucket,
			Key: id,
			Body: file.buffer,
			ContentType: file.mimetype,
		});
		this.logger.debug(uploaded);

		return createFileDto.fileName;
	}

	async findAll({
		user,
		organizationId,
		relationKey,
		relationValue,
	}: {
		user: IUser;
		organizationId: string;
		relationKey: FileRelationKey;
		relationValue: string;
	}): Promise<WithCount<FileDto>> {
		// Check permission on 'File' entity
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Read,
			subject('File', {
				relationKey,
				organizationId,
			}),
		);

		const bucket = organizationId;

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
		}

		return {
			total: objects.KeyCount ?? 0,
			results: objects.Contents?.map((e) => new FileDto(e)) ?? [],
		};
	}

	async findOne({
		id,
		user,
		organizationId,
	}: {
		id: string;
		user: IUser;
		organizationId: string;
	}) {
		const bucket = organizationId;

		const directory = this.getFileDirectory({ id });

		const { relationKey, relationValue } = this.getFileDetails({ directory });

		// Check permission on 'File' entity
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Read,
			subject('File', {
				relationKey,
				organizationId,
			}),
		);

		await this.canAccess({
			relationKey,
			relationValue,
			user,
			action: Action.Read,
		});

		// attempt to get from cache
		let presignedUrl: string;

		const cacheKey = id;
		const cached = await this.cacheManager.get<string>(cacheKey);

		if (cached) {
			this.logger.debug(`CACHE HIT: files.findOne cacheKey: ${cacheKey}`);
			presignedUrl = cached;
		} else {
			this.logger.debug(`CACHE MISS: files.findOne cacheKey: ${cacheKey}`);

			// get fresh from s3
			presignedUrl = await this.s3.getObject({
				Bucket: bucket,
				Key: id,
			});

			// set cache
			await this.cacheManager.set(cacheKey, presignedUrl, S3_TTL / 2);
		}

		return presignedUrl;
	}

	async remove({
		id,
		user,
		organizationId,
	}: {
		id: string;
		user: IUser;
		organizationId: string;
	}) {
		const bucket = organizationId;

		const directory = this.getFileDirectory({ id });

		const { relationKey, relationValue } = this.getFileDetails({ directory });

		// Check permission on 'File' entity
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Delete,
			subject('File', {
				relationKey,
				organizationId,
			}),
		);

		await this.canAccess({
			relationKey,
			relationValue,
			user,
			// Check for update permission on the relation rather than delete
			// permission on the file.
			action: Action.Update,
		});

		// bust cache for file and directory (prefix)
		this.logger.debug(`CACHE BUST: key: ${id} - directory: ${directory}`);
		await this.cacheManager.del(id);
		await this.cacheManager.del(directory);

		await this.s3.removeObject({
			Bucket: bucket,
			Key: id,
		});
	}

	/** Permission check on the relation entity */
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
		const result: unknown = await this.prisma.c[relationKey].findFirst({
			where: {
				AND: [
					{ id: relationValue },
					accessibleBy(user.ability, action)[entityMap.caslName],
				],
			},
		});

		if (!result) {
			throw new ForbiddenException();
		}
	}

	computeFileId({
		relationKey,
		relationValue,
		fileName,
	}: {
		relationKey: FileCreateSchema['relationKey'];
		relationValue: FileCreateSchema['relationValue'];
		fileName: string;
	}) {
		const directory = this.computeDirectoryKey({
			relationKey,
			relationValue,
		});

		const id = `${directory}/${fileName}`;

		return id;
	}

	computeDirectoryKey({
		relationKey,
		relationValue,
	}: {
		relationKey: FileCreateSchema['relationKey'];
		relationValue: FileCreateSchema['relationValue'];
	}) {
		const key = `${relationKey}/${relationValue}`;

		return key;
	}

	getFileDirectory({ id }: { id: string }) {
		const directory = id.split('/').slice(0, -1).join('/');

		return directory;
	}

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
}
