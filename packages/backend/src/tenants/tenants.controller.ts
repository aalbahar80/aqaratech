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
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { OrgHeaders } from 'src/decorators/org-header.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/users/dto/user.dto';

import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
@ApiTags('tenants')
@SwaggerAuth()
@OrgHeaders()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Tenant' })
  @ApiCreatedResponse({ type: TenantDto })
  create(
    @Body() createTenantDto: CreateTenantDto,
    @User() user: UserDto,
  ): Promise<TenantDto> {
    // TODO grab from header `x-role-id`
    return this.tenantsService.create({ createTenantDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
  @ApiPaginatedResponse(TenantDto)
  findAll(
    @User() user: UserDto,
    @Query() tenantPageOptionsDto: TenantPageOptionsDto,
  ): Promise<PaginatedMetaDto<TenantDto>> {
    return this.tenantsService.findAll({ tenantPageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  findOne(@Param('id') id: string, @User() user: UserDto): Promise<TenantDto> {
    return this.tenantsService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  update(
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
    @User() user: UserDto,
  ): Promise<TenantDto> {
    return this.tenantsService.update({ id, updateTenantDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  remove(@Param('id') id: string, @User() user: UserDto): Promise<TenantDto> {
    return this.tenantsService.remove({ id, user });
  }
}
