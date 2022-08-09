import { Injectable } from '@nestjs/common';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ExpensePageOptionsDto } from 'src/expenses/dto/expense-page-options.dto';
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
  }: {
    createFileDto: CreateFileDto;
    file: Express.Multer.File;
  }) {
    await this.s3.putObject({
      Key: file.filename,
      Body: file.buffer,
    });

    const created = await this.prisma.file.create({
      data: {
        ...createFileDto,
        // TODO add file url
      },
    });

    return created.id;
  }

  async findAll({
    pageOptionsDto,
    user,
  }: {
    pageOptionsDto: ExpensePageOptionsDto; // change to FilePageOptionsDto
    user: IUser;
  }): Promise<WithCount<FileDto>> {
    // TODO accessiblyBy
    const [files, total] = await Promise.all([
      this.prisma.file.findMany(),
      this.prisma.file.count(),
    ]);

    return { total, results: files.map((e) => new FileDto(e)) };
  }

  async findOne({ fileId }: { fileId: string }) {
    const file = await this.prisma.file.findUnique({
      where: { id: fileId },
    });
    return file;
  }

  remove(id: string) {
    // TODO delete in s3

    // TODO delete in db
    throw new Error('Method not implemented.');
  }
}
