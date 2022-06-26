import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import {
  PropertyDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';
import { PropertiesService } from './properties.service';

@Controller('properties')
@ApiTags('properties')
@SwaggerAuth()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Property' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: PropertyDto })
  create(
    @User() user: IUser,
    @Body() createPropertyDto: PropertyDto,
  ): Promise<PropertyDto> {
    return this.propertiesService.create({ createPropertyDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Property' })
  @ApiPaginatedResponse(PropertyDto)
  findAll(
    @User() user: IUser,
    @Query() propertyPageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<PropertyDto>> {
    return this.propertiesService.findAll({ propertyPageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Property' })
  @ApiOkResponse({ type: PropertyDto })
  findOne(@User() user: IUser, @Param('id') id: string): Promise<PropertyDto> {
    return this.propertiesService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Property' })
  @ApiOkResponse({ type: PropertyDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyDto> {
    return this.propertiesService.update({ id, updatePropertyDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Property' })
  @ApiOkResponse({ type: PropertyDto })
  remove(@User() user: IUser, @Param('id') id: string): Promise<PropertyDto> {
    return this.propertiesService.remove({ id, user });
  }
}
