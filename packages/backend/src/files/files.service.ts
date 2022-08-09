import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from 'src/casl/casl-ability.factory';
import { WithCount } from 'src/common/dto/paginated.dto';
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
    ForbiddenError.from(user.ability).throwUnlessCan(
      Action.Create,
      subject('File', createFileDto),
    );
    console.log({ createFileDto }, 'files.service.ts ~ 28');
    console.log({ file }, 'files.service.ts ~ 29');
    const key = this.extrapolateKey(createFileDto);
    const uploaded = await this.s3.putObject({
      Bucket: user.role.organizationId,
      Key: key, // TODO set programmatically
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
    // const filter: Prisma.FileWhereInput = {
    //   [fileFindAllOptionsDto.relationKey]: {
    //     equals: fileFindAllOptionsDto.relationValue,
    //   },
    // };
    // TODO accessiblyBy
    // const [files, total] = await Promise.all([
    //   this.prisma.file.findMany({ where: filter }),
    //   this.prisma.file.count({ where: filter }),
    // ]);

    // console.log({ files }, 'files.service.ts ~ 64');

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
    return this.s3.getObject({ Bucket: user.role.organizationId, Key: fileId });
  }

  async remove({ id, user }: { id: string; user: IUser }) {
    return this.s3.removeObject({
      Bucket: user.role.organizationId,
      Key: id,
    });
  }

  // a function to create an object key based on fileFindAllOptionsDto
  extrapolateKey(fileFindAllOptionsDto: FileFindAllOptionsDto) {
    const key = fileFindAllOptionsDto.relationKey;
    const id = fileFindAllOptionsDto.relationValue;

    if (key === FileForeignKeys.tenantId) {
      return `tenants/${id}`;
    } else if (key === FileForeignKeys.portfolioId) {
      return `portfolios/${id}`;
    } else if (key === FileForeignKeys.propertyId) {
      return `properties/${id}`;
    } else if (key === FileForeignKeys.unitId) {
      return `units/${id}`;
    } else if (key === FileForeignKeys.leaseId) {
      return `leases/${id}`;
    } else if (key === FileForeignKeys.leaseInvoiceId) {
      return `leaseInvoices/${id}`;
    } else if (key === FileForeignKeys.expenseId) {
      return `expenses/${id}`;
    } else if (key === FileForeignKeys.maintenanceOrderId) {
      return `maintenanceOrders/${id}`;
    } else {
      throw new Error(`Invalid key: ${key}. Value: ${id}`);
    }
  }
}
