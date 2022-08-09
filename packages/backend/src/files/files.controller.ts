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
import { ApiBody, ApiConsumes, ApiHeader, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { ExpensePageOptionsDto } from 'src/expenses/dto/expense-page-options.dto';
import { CreateFileDto, FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { FileUploadDto } from 'src/organizations/dto/file-upload.dto';
import { FilesService } from './files.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('organization/:organizationId/files')
@ApiTags('files')
@SwaggerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @CheckAbilities({
    action: Action.Update, // vs Action.Create?
    subject: 'Organization',
    params: ['organizationId'],
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of files',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10000000 })],
      }),
    )
    file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
  ) {
    return this.filesService.create({ file, createFileDto });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'File' })
  // TODO ability check in service, or use accessibleBy
  @ApiPaginatedResponse(FileDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: ExpensePageOptionsDto, // TODO change to FilePageOptionsDto
  ): Promise<WithCount<FileDto>> {
    return this.filesService.findAll({ pageOptionsDto, user });
  }

  @Get(':fileId')
  @CheckAbilities({ action: Action.Read, subject: 'File', params: ['fileId'] })
  findFile(@Param('fileId') fileId: string) {
    return this.filesService.findOne({ fileId });
  }

  @Delete(':fileId')
  @CheckAbilities({
    action: Action.Delete,
    subject: 'File',
    params: ['fileId'],
  })
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
