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
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import {
  PropertyDto,
  PropertyOneDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';
import { UnitDto } from 'src/units/dto/unit.dto';
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
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<PropertyDto>> {
    return this.propertiesService.findAll({ pageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Property' })
  @ApiOkResponse({ type: PropertyOneDto })
  findOne(@Param('id') id: string): Promise<PropertyDto> {
    return this.propertiesService.findOne({ id });
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
  remove(@Param('id') id: string): Promise<PropertyDto> {
    return this.propertiesService.remove({ id });
  }

  @Get(':id/units')
  @CheckAbilities({ action: Action.Read, subject: 'Property' })
  @ApiPaginatedResponse(UnitDto)
  findUnits(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<PaginatedMetaDto<UnitDto>> {
    return this.propertiesService.findUnits({ id, user, pageOptionsDto });
  }
}
