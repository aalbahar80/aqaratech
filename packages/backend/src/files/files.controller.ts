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
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';

import {
	fileCreateSchema,
	fileFindAllOptionsSchema,
	fileFindOneOptionsSchema,
} from '@self/utils';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { BackendEnvSchema } from 'src/env/env.schema';
import {
	FileFindAllOptionsDto,
	FileFindOneOptionsDto,
} from 'src/files/dto/file-find-all-options.dto';
import { CreateFileDto, FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

import { FilesService } from './files.service';

@Controller()
@ApiTags('files')
@SwaggerAuth()
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('/organizations/:organizationId/files')
	// In service layer we additionally check whether the user has access to update
	// the file's related entity.
	@ApiCreatedResponse({ type: String })
	@UseInterceptors(FileInterceptor('file'))
	@ApiConsumes('multipart/form-data')
	@ApiBody({ type: CreateFileDto })
	create(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					// NOTE: keep in sync with BODY_SIZE_LIMIT env var (sveltekit's node adapter)
					// It is set in site/Dockerfile and site/package.json (preview:node script)
					new MaxFileSizeValidator({
						// Typecast because we can't access this.env from decorators
						maxSize: process.env
							.BODY_SIZE_LIMIT as unknown as BackendEnvSchema['BODY_SIZE_LIMIT'],
					}),
				],
			}),
		)
		file: Express.Multer.File,
		@Body(new ZodValidationPipe(fileCreateSchema.omit({ file: true })))
		createFileDto: Omit<CreateFileDto, 'file'>,
	): Promise<string> {
		return this.filesService.create({
			file,
			createFileDto,
			organizationId,
			user,
		});
	}

	@Get('/organizations/:organizationId/files')
	@CheckAbilities({ action: Action.Read, subject: 'File' })
	@ApiPaginatedResponse(FileDto)
	findAll(
		@Param('organizationId') organizationId: string,
		@User() user: IUser,
		@Query(new ZodValidationPipe(fileFindAllOptionsSchema))
		fileFindAllOptionsDto: FileFindAllOptionsDto,
	): Promise<WithCount<FileDto>> {
		const { relationKey, relationValue } = fileFindAllOptionsDto;
		return this.filesService.findAll({
			relationKey,
			relationValue,
			user,
			organizationId,
		});
	}

	@Get('/organizations/:organizationId/files/find-one')
	@ApiOkResponse({ type: String })
	async findOne(
		@Param('organizationId') organizationId: string,
		@User() user: IUser,
		@Query(new ZodValidationPipe(fileFindOneOptionsSchema))
		fileFindOneOptionsDto: FileFindOneOptionsDto,
	): Promise<string> {
		const id = fileFindOneOptionsDto.id;

		return await this.filesService.findOne({ id, user, organizationId });
	}

	@Delete('/organizations/:organizationId/files')
	@ApiOkResponse({ type: String })
	async remove(
		@Param('organizationId') organizationId: string,
		@User() user: IUser,
		@Query() fileFindOneOptionsDto: FileFindOneOptionsDto,
	): Promise<string> {
		const id = fileFindOneOptionsDto.id;

		await this.filesService.remove({ id, user, organizationId });

		return id;
	}
}
