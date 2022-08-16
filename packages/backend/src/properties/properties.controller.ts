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

const SubjectType = 'Property';

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
  @CheckAbilities({ action: Action.Create, subject: SubjectType })
  @ApiCreatedResponse({ type: PropertyDto })
  create(
    @User() user: IUser,
    @Body() createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyDto> {
    return this.propertiesService.create({ createPropertyDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: SubjectType })
  @ApiPaginatedResponse(PropertyDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<WithCount<PropertyDto>> {
    return this.propertiesService.findAll({ pageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: SubjectType })
  @ApiOkResponse({ type: PropertyDto })
  findOne(@User() user: IUser, @Param('id') id: string): Promise<PropertyDto> {
    return this.propertiesService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: SubjectType })
  @ApiOkResponse({ type: PropertyDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyDto> {
    return this.propertiesService.update({ id, updatePropertyDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: SubjectType })
  @ApiOkResponse({ type: String })
  remove(@User() user: IUser, @Param('id') id: string): Promise<string> {
    return this.propertiesService.remove({ id, user });
  }

  @Get(':id/units')
  @CheckAbilities({ action: Action.Read, subject: 'Unit' })
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
