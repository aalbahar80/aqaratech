import {
	Body,
	Controller,
	Delete,
	Get,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiConsumes,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import { fileCreateSchema } from '@self/utils';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
	FileFindAllOptionsDto,
	FileFindOneOptionsDto,
} from 'src/files/dto/file-find-all-options.dto';
import { CreateFileDto, FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
@SwaggerAuth()
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post()
	@ApiConsumes('multipart/form-data')
	@ApiCreatedResponse({ type: String })
	@UseInterceptors(FileInterceptor('file'))
	create(
		@User() user: IUser,
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 100 * 1000 * 1000 })],
			}),
		)
		file: Express.Multer.File,
		@Body(new ZodValidationPipe(fileCreateSchema))
		createFileDto: CreateFileDto,
	): Promise<string> {
		return this.filesService.create({ user, file, createFileDto });
	}

	@Get()
	@ApiPaginatedResponse(FileDto)
	findAll(
		@User() user: IUser,
		@Query() fileFindAllOptionsDto: FileFindAllOptionsDto,
	): Promise<WithCount<FileDto>> {
		const { relationKey, relationValue } = fileFindAllOptionsDto;
		return this.filesService.findAll({ relationKey, relationValue, user });
	}

	@Get('/find-one')
	@ApiOkResponse({ type: String })
	async findOne(
		@User() user: IUser,
		@Query() fileFindOneOptionsDto: FileFindOneOptionsDto,
	): Promise<string> {
		const key = fileFindOneOptionsDto.key;

		return this.filesService.findOne({ key, user });
	}

	@Delete()
	@ApiOkResponse({ type: String })
	async remove(
		@User() user: IUser,
		@Query() fileFindOneOptionsDto: FileFindOneOptionsDto,
	): Promise<string> {
		const key = fileFindOneOptionsDto.key;

		await this.filesService.remove({ key, user });

		return key;
	}
}
