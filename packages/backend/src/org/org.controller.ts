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
import { CreateOrgDto, OrgDto } from './dto/org.dto';
import { OrgsService } from './orgs.service';

@Controller('orgs')
@ApiTags('orgs')
@SwaggerAuth()
export class OrgsController {
  constructor(
    private readonly orgsService: OrgsService,
    private rolesService: RolesService,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Organization' })
  @ApiCreatedResponse({ type: OrgDto })
  create(
    @User() user: IUser,
    @Body() createOrgDto: CreateOrgDto,
  ): Promise<OrgDto> {
    return this.orgsService.create({ createOrgDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Organization' })
  @ApiOkResponse({ type: OrgDto })
  findOne(@Param('id') id: string): Promise<OrgDto> {
    return this.orgsService.findOne({ id });
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
