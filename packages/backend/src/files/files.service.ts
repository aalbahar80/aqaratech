import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/casl-ability.factory';
import { WithCount } from 'src/common/dto/paginated.dto';
import { FileFindAllOptionsDto } from 'src/files/dto/file-find-all-options.dto';
import { CreateFileDto, FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService, private s3: S3Service) {}

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
    const uploaded = await this.s3.putObject({
      Key: createFileDto.fileName, // TODO set programmatically
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

    const objects = await this.s3.listObjects();
    console.log(objects, 'files.service.ts ~ 68');

    return {
      total: objects.KeyCount || 0,
      results: objects.Contents?.map((e) => new FileDto(e)) || [],
    };
  }

  async findOne({ fileId }: { fileId: string }) {
    return this.s3.getObject({ Key: fileId });
  }

  remove(id: string) {
    return this.s3.removeObject({ Key: id });
  }
}
