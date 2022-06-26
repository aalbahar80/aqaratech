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
import { IUser } from 'src/types/request.type';
import { UserDto } from 'src/users/dto/user.dto';

import { TenantPageOptionsDto } from 'src/tenants/dto/tenant-page-options.dto';
import { TenantDto, UpdateTenantDto } from 'src/tenants/dto/tenant.dto';
import { TenantsService } from './tenants.service';

@Controller('tenants')
@ApiTags('tenants')
@SwaggerAuth()
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Tenant' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: TenantDto })
  create(
    @User() user: IUser,
    @Body() createTenantDto: TenantDto,
  ): Promise<TenantDto> {
    return this.tenantsService.create({ createTenantDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
  @ApiPaginatedResponse(TenantDto)
  findAll(
    @Query() tenantPageOptionsDto: TenantPageOptionsDto,
    @User() user: IUser,
  ): Promise<PaginatedMetaDto<TenantDto>> {
    return this.tenantsService.findAll({ tenantPageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  findOne(@User() user: UserDto, @Param('id') id: string): Promise<TenantDto> {
    return this.tenantsService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  update(
    @User() user: UserDto,
    @Param('id') id: string,
    @Body() updateTenantDto: UpdateTenantDto,
  ): Promise<TenantDto> {
    return this.tenantsService.update({ id, updateTenantDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Tenant' })
  @ApiOkResponse({ type: TenantDto })
  remove(@User() user: UserDto, @Param('id') id: string): Promise<TenantDto> {
    return this.tenantsService.remove({ id, user });
  }
}
