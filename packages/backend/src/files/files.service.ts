import { ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { accessibleBy } from '@casl/prisma';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { DBEntity, entitiesMap } from '@self/utils';
import { Cache } from 'cache-manager';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { S3_TTL } from 'src/constants/s3-ttl';
import {
	CreateFileDto,
	DirectoryRequestDto,
	FileDto,
	FileRequestDto,
} from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class FilesService {
	constructor(
		private s3: S3Service,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private readonly prisma: PrismaService,
	) {}

	private readonly logger = new Logger(FilesService.name);

	async create({
		createFileDto,
		file,
		user,
	}: {
		createFileDto: CreateFileDto;
		file: Express.Multer.File;
		user: IUser;
	}) {
		const { bucket, directory, key, entity, entityId } =
			createFileDto.fileRequestDto;
		this.logger.debug(
			`Attempting to create file: ${key} in bucket: ${bucket} in directory: ${directory}`,
		);

		await this.canAccess({
			entity,
			entityId,
			user,
			action: Action.Update,
		});

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
		directoryRequestDto,
		user,
	}: {
		directoryRequestDto: DirectoryRequestDto;
		user: IUser;
	}): Promise<WithCount<FileDto>> {
		const { bucket, directory, entity, entityId } = directoryRequestDto;

		await this.canAccess({
			entity,
			entityId,
			user,
			action: Action.Read,
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
			await this.cacheManager.set<s3Objects>(cacheKey, objects, {
				ttl: 60 * 60 * 24,
			});
		}

		return {
			total: objects?.KeyCount || 0,
			results: objects?.Contents?.map((e) => new FileDto(e)) || [],
		};
	}

	async findOne({
		fileRequestDto,
		user,
	}: {
		fileRequestDto: FileRequestDto;
		user: IUser;
	}) {
		const { key, bucket, entity, entityId } = fileRequestDto;

		await this.canAccess({
			entity,
			entityId,
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
			await this.cacheManager.set<string>(cacheKey, presignedUrl, {
				ttl: S3_TTL / 2,
			});
		}

		return presignedUrl;
	}

	async remove({
		fileRequestDto,
		user,
	}: {
		fileRequestDto: FileRequestDto;
		user: IUser;
	}) {
		const { key, directory, bucket, entity, entityId } = fileRequestDto;

		await this.canAccess({
			entity,
			entityId,
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
		entity,
		entityId,
		user,
		action,
	}: {
		entity: DBEntity;
		entityId: string;
		user: IUser;
		action: Action;
	}) {
		const entityMap = entitiesMap[entity];
		// @ts-expect-error - uniontype not cutting it
		await this.prisma[entity].findFirstOrThrow({
			where: {
				AND: [
					{ id: entityId },
					accessibleBy(user.ability, action)[entityMap.caslName],
				],
			},
		});
	}
}
