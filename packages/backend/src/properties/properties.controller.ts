import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { propertyUpdateSchema } from '@self/utils';

import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import {
	ApiQueryOptions,
	QueryParser,
} from 'src/decorators/query-options.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
	PropertyDto,
	UpdatePropertyDto,
} from 'src/properties/dto/property.dto';

import { PropertiesService } from './properties.service';

const SubjectType = 'Property';

@Controller('properties')
@ApiTags('properties')
@SwaggerAuth()
export class PropertiesController {
	constructor(private readonly propertiesService: PropertiesService) {}

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiQueryOptions()
	@ApiPaginatedResponse(PropertyDto)
	findAll(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
	): Promise<WithCount<PropertyDto>> {
		return this.propertiesService.findAll({ queryOptions, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: PropertyDto })
	findOne(@User() user: IUser, @Param('id') id: string): Promise<PropertyDto> {
		return this.propertiesService.findOne({ id, user });
	}

	@Patch(':id')
	// @CheckAbilities({ action: Action.Update, subject: SubjectType })
	@SkipAbilityCheck() // TODO rm
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(propertyUpdateSchema))
		updatePropertyDto: UpdatePropertyDto,
	): Promise<PropertyDto> {
		return this.propertiesService.update({ id, updatePropertyDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@User() user: IUser, @Param('id') id: string): Promise<PropertyDto> {
		return this.propertiesService.remove({ id, user });
	}
}
