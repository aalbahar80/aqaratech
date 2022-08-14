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
import { Prisma } from '@prisma/client';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';

import { IUser } from 'src/interfaces/user.interface';
import {
  CreatePropertyDto,
  PropertyDto,
  UpdatePropertyDto,
} from 'src/properties/dto/property.dto';
import { UnitDto } from 'src/units/dto/unit.dto';
import { UnitsService } from 'src/units/units.service';
import { PropertiesService } from './properties.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('properties')
@ApiTags('properties')
@SwaggerAuth()
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private unitsService: UnitsService,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Property' })
  @ApiCreatedResponse({ type: String })
  create(
    @User() user: IUser,
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<string> {
    return this.propertiesService.create({ createPropertyDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Property' })
  @ApiPaginatedResponse(PropertyDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<WithCount<PropertyDto>> {
    return this.propertiesService.findAll({ pageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Property' })
  @ApiOkResponse({ type: PropertyDto })
  findOne(@Param('id') id: string): Promise<PropertyDto> {
    return this.propertiesService.findOne({ id });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Property' })
  @ApiOkResponse({ type: String })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<string> {
    return this.propertiesService.update({ id, updatePropertyDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Property' })
  @ApiOkResponse({ type: String })
  remove(@Param('id') id: string): Promise<string> {
    return this.propertiesService.remove({ id });
  }

  @Get(':id/units')
  @ApiPaginatedResponse(UnitDto)
  findUnits(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<WithCount<UnitDto>> {
    const where: Prisma.UnitWhereInput = { propertyId: { equals: id } };
    return this.unitsService.findAll({ user, pageOptionsDto, where });
  }
}
