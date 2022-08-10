import { ListObjectsV2CommandOutput } from '@aws-sdk/client-s3';
import { ForbiddenError, subject } from '@casl/ability';
import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Action } from 'src/casl/casl-ability.factory';
import { WithCount } from 'src/common/dto/paginated.dto';
import { entityMap } from 'src/constants/entity';
import { FileFindAllOptionsDto } from 'src/files/dto/file-find-all-options.dto';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';
import { CreateFileDto, FileDto, FileRequestDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class FilesService {
  constructor(
    private s3: S3Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const key = createFileDto.relationKey;
    const id = createFileDto.relationValue;
    const singularCap = entityMap[key].singularCap;

    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Update,
      subject(singularCap, { id: id }),
    );

    // TODO bust cache

    const prefix = `${entityMap[key].urlName}/${id}`;
    const uploaded = await this.s3.putObject({
      Bucket: user.role.organizationId,
      Key: `${prefix}/${createFileDto.fileName}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    });
    console.log({ uploaded }, 'files.service.ts ~ 36');
    return createFileDto.fileName;
  }

  async findAll({
    fileFindAllOptionsDto,
    user,
  }: {
    fileFindAllOptionsDto: FileFindAllOptionsDto; // change to FilePageOptionsDto
    user: IUser;
  }): Promise<WithCount<FileDto>> {
    // TODO ability check here

    type s3Objects = ListObjectsV2CommandOutput | undefined;
    let objects: s3Objects;

    // attempt to get from cache
    const cacheKey = user.role.organizationId; // TODO use fileRequestDto?
    const cached = await this.cacheManager.get<s3Objects>(cacheKey);

    if (cached) {
      this.logger.debug(`findAll: found in cache for ${cacheKey}`);
      objects = cached;
    } else {
      this.logger.debug(`findAll: not found in cache for ${cacheKey}`);

      // get fresh from s3
      objects = await this.s3.listObjects({
        Bucket: user.role.organizationId, // TODO use fileRequestDto.bucket?
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
    // TODO ability check here

    // attempt to get from cache
    let presignedUrl: string;

    const cacheKey = fileRequestDto.key;
    const cached = await this.cacheManager.get<string>(cacheKey);

    if (cached) {
      this.logger.debug(`findOne: found in cache for ${cacheKey}`);
      presignedUrl = cached;
    } else {
      this.logger.debug(`findOne: not found in cache for ${cacheKey}`);

      // get fresh from s3
      presignedUrl = await this.s3.getObject({
        Bucket: fileRequestDto.bucket,
        Key: fileRequestDto.key,
      });

      // set cache
      await this.cacheManager.set<string>(cacheKey, presignedUrl, {
        ttl: 60 * 60 * 24, // TODO set to half time of presigned url duration
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
    // TODO ability check here

    // bust cache
    const cacheKey = fileRequestDto.key;
    this.logger.debug(`busting cache for ${cacheKey}`);
    await this.cacheManager.del(cacheKey);

    await this.s3.removeObject({
      Bucket: fileRequestDto.bucket,
      Key: fileRequestDto.key,
    });
  }

  // a function to create an object key based on fileFindAllOptionsDto
  extrapolateKey(fileFindAllOptionsDto: FileFindAllOptionsDto) {
    const key = fileFindAllOptionsDto.relationKey;
    const id = fileFindAllOptionsDto.relationValue;
    const singularCap = entityMap[key].singularCap;

    if (key === FileForeignKeys.TENANT) {
      return `${key}/${id}`;
    } else if (key === FileForeignKeys.PORTFOLIO) {
      return `portfolios/${id}`;
    } else if (key === FileForeignKeys.PROPERTY) {
      return `properties/${id}`;
    } else if (key === FileForeignKeys.UNIT) {
      return `units/${id}`;
    } else if (key === FileForeignKeys.LEASE) {
      return `leases/${id}`;
    } else if (key === FileForeignKeys.LEASEINVOICE) {
      return `leaseInvoices/${id}`;
    } else if (key === FileForeignKeys.EXPENSE) {
      return `expenses/${id}`;
    } else if (key === FileForeignKeys.MAINTENANCEORDER) {
      return `maintenanceOrders/${id}`;
    } else {
      throw new Error(`Invalid key: ${key}. Value: ${id}`);
    }
  }
}
