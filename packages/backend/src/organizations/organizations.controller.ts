import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/casl-ability.factory';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { CreateOrganizationDto, OrganizationDto } from './dto/organization.dto';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
@ApiTags('organizations')
@SwaggerAuth()
export class OrganizationsController {
  constructor(
    private readonly organizationsService: OrganizationsService,
    private rolesService: RolesService,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Organization' })
  @ApiCreatedResponse({ type: OrganizationDto })
  create(
    @User() user: IUser,
    @Body() createOrganizationDto: CreateOrganizationDto,
  ): Promise<OrganizationDto> {
    return this.organizationsService.create({ createOrganizationDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Organization' })
  @ApiOkResponse({ type: OrganizationDto })
  findOne(@Param('id') id: string): Promise<OrganizationDto> {
    return this.organizationsService.findOne({ id });
  }

  @Get(':id/roles')
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
}
