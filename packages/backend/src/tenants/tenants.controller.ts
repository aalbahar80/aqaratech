import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
@ApiTags('tenants')
@ApiExtraModels(PaginatedDto)
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
  findAll(): Promise<PaginatedDto<TenantDto>> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TenantDto })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
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
