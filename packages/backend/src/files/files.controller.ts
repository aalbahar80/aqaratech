import { Controller, Delete, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
	FileFindAllOptionsDto,
	FileFindOneOptionsDto,
} from 'src/files/dto/file-find-all-options.dto';
import { FileDto } from 'src/files/dto/file.dto';
import { IUser } from 'src/interfaces/user.interface';
import { FilesService } from './files.service';

@Controller('files')
@ApiTags('files')
@SwaggerAuth()
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: 'File' })
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
