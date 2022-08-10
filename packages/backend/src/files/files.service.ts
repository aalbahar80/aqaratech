import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/casl/casl-ability.factory';
import { WithCount } from 'src/common/dto/paginated.dto';
import { entityMap } from 'src/constants/entity';
import { FileFindAllOptionsDto } from 'src/files/dto/file-find-all-options.dto';
import { FileForeignKeys } from 'src/files/dto/file-foreign-keys';
import { CreateFileDto, FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class FilesService {
  constructor(private s3: S3Service) {}

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

    const objects = await this.s3.listObjects({
      Bucket: user.role.organizationId,
    });
    console.log(objects, 'files.service.ts ~ 68');

    return {
      total: objects?.KeyCount || 0,
      results: objects?.Contents?.map((e) => new FileDto(e)) || [],
    };
  }

  async findOne({ fileId, user }: { fileId: string; user: IUser }) {
    // TODO ability check here
    return this.s3.getObject({ Bucket: user.role.organizationId, Key: fileId });
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    // TODO ability check here
    return this.s3.removeObject({
      Bucket: user.role.organizationId,
      Key: id,
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
