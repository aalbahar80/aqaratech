import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
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
  @ApiCreatedResponse({ type: TenantDto })
  create(@Body() createTenantDto: CreateTenantDto) {
    console.log({ createTenantDto }, 'tenants.controller.ts ~ 23');
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  @ApiPaginatedResponse(TenantDto)
  findAll(
    @User() user: UserDto,
    @Query() tenantPageOptionsDto: TenantPageOptionsDto,
  ): Promise<PaginatedMetaDto<TenantDto>> {
    return this.tenantsService.findAll(tenantPageOptionsDto, user);
  }

  @Get(':id')
  @ApiOkResponse({ type: TenantDto })
  async findOne(@Param('id') id: string, @User() user: UserDto) {
    return this.tenantsService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TenantDto })
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Tenant' })
  @UseGuards(AbilitiesGuard)
  @ApiOkResponse({ type: TenantDto })
  remove(@Param('id') id: string, @User() user: UserDto) {
    // console.log({ user }, 'tenants.controller.ts ~ 79');
    console.log('granted access to delllete tenant ' + id);
    return this.tenantsService.remove({ id, user });
  }
}
