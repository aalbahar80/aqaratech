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
  getSchemaPath,
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
import { LeaseDto } from 'src/leases/dto/lease.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { CreateUnitDto, UnitDto, UpdateUnitDto } from 'src/units/dto/unit.dto';
import { UnitsService } from './units.service';

@Controller('units')
@ApiTags('units')
@SwaggerAuth()
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Unit' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: UnitDto })
  create(
    @User() user: IUser,
    @Body() createUnitDto: CreateUnitDto,
  ): Promise<UnitDto> {
    return this.unitsService.create({ createUnitDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Unit' })
  @ApiPaginatedResponse(UnitDto)
  findAll(
    @User() user: IUser,
    @Query() unitPageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<UnitDto>> {
    return this.unitsService.findAll({ unitPageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Unit' })
  @ApiOkResponse({ type: UnitDto })
  findOne(@Param('id') id: string): Promise<UnitDto> {
    return this.unitsService.findOne({ id });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Unit' })
  @ApiOkResponse({ type: UnitDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<UnitDto> {
    return this.unitsService.update({ id, updateUnitDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Unit' })
  // @ApiOkResponse({ type: UnitDto })
  remove(@Param('id') id: string): Promise<string> {
    return this.unitsService.remove({ id });
  }

  @Get(':id/leases')
  // @CheckAbilities(
  //   { action: Action.Read, subject: 'Lease' },
  //   { action: Action.Read, subject: 'Tenant' },
  // )
  @ApiOkResponse({
    schema: {
      title: `PaginatedResponseOf${'FindLeases'}`,
      allOf: [
        { $ref: getSchemaPath(PaginatedMetaDto) },
        {
          properties: {
            results: {
              type: 'array',
              items: {
                type: 'object',
                required: ['lease'],
                allOf: [
                  { $ref: getSchemaPath(LeaseDto) },
                  {
                    type: 'object',
                    required: ['tenant'],
                    properties: {
                      tenant: {
                        type: 'object',
                        $ref: getSchemaPath(TenantDto),
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      ],
    },
  })
  findLeases(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<PaginatedMetaDto<LeaseDto & { tenant: TenantDto }>> {
    return this.unitsService.findLeases({ id, user, pageOptionsDto });
  }
}
