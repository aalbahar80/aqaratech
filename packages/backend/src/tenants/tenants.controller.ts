import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { OrgHeaders } from 'src/decorators/org-header.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';

import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { UserDto } from 'src/users/dto/user.dto';
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
    @Request() req: Request & { user: UserDto },
    @Query() tenantPageOptionsDto: TenantPageOptionsDto,
  ): Promise<PaginatedMetaDto<TenantDto>> {
    return this.tenantsService.findAll(tenantPageOptionsDto, req.user);
  }

  @Get(':id')
  @ApiOkResponse({ type: TenantDto })
  async findOne(
    @Param('id') id: string,
    @Request() req: Request & { user: UserDto },
  ) {
    return this.tenantsService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TenantDto })
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TenantDto })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}
