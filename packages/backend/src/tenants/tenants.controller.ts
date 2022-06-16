import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { TenantEntity } from 'src/tenants/entities/tenant.entity';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
@ApiTags('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @ApiCreatedResponse({ type: TenantEntity })
  create(@Body() createTenantDto: CreateTenantDto) {
    console.log({ createTenantDto }, 'tenants.controller.ts ~ 23');
    return this.tenantsService.create(createTenantDto);
  }

  @Get()
  @ApiOkResponse({ type: TenantEntity, isArray: true })
  findAll() {
    return this.tenantsService.findAll();
  }

  // @Get()
  // findAll(@Query() query: ListAllEntities) {
  //   return `This action return asll tenants (limit: ${query.limit} offset: ${query.offset})`;
  // }

  @Get(':id')
  @ApiOkResponse({ type: TenantEntity })
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TenantEntity })
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantsService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: TenantEntity })
  remove(@Param('id') id: string) {
    return this.tenantsService.remove(id);
  }
}
