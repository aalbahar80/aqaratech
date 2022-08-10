import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { FileFindAllOptionsDto } from 'src/files/dto/file-find-all-options.dto';
import { CreateFileDto, FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { FilesService } from './files.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('files')
@ApiTags('files')
@SwaggerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiExtraModels(CreateFileDto)
  @ApiBody({
    type: CreateFileDto,
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateFileDto) },
        {
          properties: {
            file: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      ],
    },
  })
  @ApiCreatedResponse({ type: String })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @User() user: IUser,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
  ): Promise<string> {
    return this.filesService.create({ user, file, createFileDto });
  }

  @Get()
  @ApiPaginatedResponse(FileDto)
  findAll(
    @User() user: IUser,
    @Query() fileFindAllOptionsDto: FileFindAllOptionsDto, // TODO change to FilePageOptionsDto
  ): Promise<WithCount<FileDto>> {
    return this.filesService.findAll({ fileFindAllOptionsDto, user });
  }

  @Get(':fileId')
  @ApiOkResponse({ type: String })
  async findOne(
    @User() user: IUser,
    @Param('fileId') fileId: string,
  ): Promise<string> {
    return this.filesService.findOne({ fileId, user });
  }

  @Delete(':fileId')
  @ApiOkResponse({ type: String })
  async remove(
    @User() user: IUser,
    @Param('fileId') fileId: string,
  ): Promise<string> {
    await this.filesService.remove({ id: fileId, user });
    return fileId;
  }
}
