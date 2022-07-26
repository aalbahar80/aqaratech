import {
  Body,
  Controller,
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
  OrganizationSettingsDto,
  UpdateOrganizationSettingsDto,
} from 'src/organizations/dto/organizationSettings.dto';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { SearchService } from 'src/search/search.service';
import {
  CreateOrganizationDto,
  OrganizationCreatedDto,
  OrganizationDto,
} from './dto/organization.dto';
import { OrganizationsService } from './organizations.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('organizations')
@ApiTags('organizations')
@SwaggerAuth()
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private rolesService: RolesService,
    private readonly searchService: SearchService,
  ) {}

  @Post()
  // No need to check abilities here. Any authenticated user can create an organization.
  @ApiCreatedResponse({ type: OrganizationCreatedDto })
  create(
    @User() user: IUser,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationCreatedDto> {
    // also returns the roleId for the created organization admin
    return this.organizationsService.create({ createOrganizationDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Organization' })
  @ApiOkResponse({ type: OrganizationDto })
  findOne(@Param('id') id: string): Promise<OrganizationDto> {
    return this.organizationsService.findOne({ id });
  }

  @Get(':id/roles')
  // TODO configure orgs in CASL
  @CheckAbilities({ action: Action.Read, subject: 'Organization' })
  @ApiPaginatedResponse(RoleDto)
  findRoles(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<WithCount<RoleDto>> {
    const where: Prisma.RoleWhereInput = { organizationId: id };
    return this.rolesService.findAll({ user, pageOptionsDto, where });
  }

  @CheckAbilities({ action: Action.Read, subject: 'Organization' })
  @Get(':id/search')
  search(@Param('id') id: string, @Query('query') query: string) {
    return this.searchService.search({ query, organizationId: id });
  }

  @Get(':id/settings')
  @CheckAbilities({ action: Action.Read, subject: 'Organization' })
  @ApiOkResponse({ type: OrganizationSettingsDto })
  findSettings(
    @Param('id') organizationId: string,
  ): Promise<OrganizationSettingsDto> {
    return this.organizationsService.findSettings({ organizationId });
  }

  @Patch(':id/settings')
  @CheckAbilities({ action: Action.Update, subject: 'Organization' })
  @ApiOkResponse({ type: OrganizationSettingsDto })
  updateSettings(
    @Param('id') organizationId: string,
    @Body() updateOrganizationSettingsDto: UpdateOrganizationSettingsDto,
  ): Promise<OrganizationSettingsDto> {
    return this.organizationsService.updateSettings({
      organizationId,
      updateOrganizationSettingsDto,
    });
  }
}
