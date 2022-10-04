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
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
	FileFindAllOptionsDto,
	FileFindOneOptionsDto,
} from 'src/files/dto/file-find-all-options.dto';
import {
	CreateFileDto,
	DirectoryRequestDto,
	FileDto,
	FileRequestDto,
} from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
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
		@Body() createFileDto: CreateFileDto,
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
		const directory = `${relationKey}/${relationValue}`;
		const directoryRequestDto = new DirectoryRequestDto({ directory, user });
		return this.filesService.findAll({ directoryRequestDto, user });
	}

	@Get('/find-one')
	@ApiOkResponse({ type: String })
	async findOne(
		@User() user: IUser,
		@Query() fileFindOneOptionsDto: FileFindOneOptionsDto,
	): Promise<string> {
		const fileRequestDto = new FileRequestDto({
			key: fileFindOneOptionsDto.key,
			user,
		});
		return this.filesService.findOne({ fileRequestDto, user });
	}

	@Delete()
	@ApiOkResponse({ type: String })
	async remove(
		@User() user: IUser,
		@Query() fileFindOneOptionsDto: FileFindOneOptionsDto,
	): Promise<string> {
		const key = fileFindOneOptionsDto.key;
		const fileRequestDto = new FileRequestDto({ key, user });
		await this.filesService.remove({ fileRequestDto, user });
		return key;
	}
}
