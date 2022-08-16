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
import { PropertyDto } from 'src/properties/dto/property.dto';
import { PropertiesService } from 'src/properties/properties.service';
import { RoleDto } from 'src/roles/dto/role.dto';
import { RolesService } from 'src/roles/roles.service';
import { UnitDto } from 'src/units/dto/unit.dto';
import { UnitsService } from 'src/units/units.service';
import {
  CreatePortfolioDto,
  PortfolioDto,
  UpdatePortfolioDto,
} from './dto/portfolio.dto';
import { PortfoliosService } from './portfolios.service';

const SubjectType = 'Portfolio';

@ApiHeader({ name: ROLE_HEADER })
@Controller('portfolios')
@ApiTags('portfolios')
@SwaggerAuth()
export class PortfoliosController {
  constructor(
    private readonly portfoliosService: PortfoliosService,
    private readonly rolesService: RolesService,
    private readonly propertiesService: PropertiesService,
    private unitsService: UnitsService,
  ) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: SubjectType })
  @ApiCreatedResponse({ type: PortfolioDto })
  create(
    @User() user: IUser,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.create({ createPortfolioDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: SubjectType })
  @ApiPaginatedResponse(PortfolioDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<WithCount<PortfolioDto>> {
    return this.portfoliosService.findAll({ pageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: SubjectType })
  @ApiOkResponse({ type: PortfolioDto })
  findOne(@User() user: IUser, @Param('id') id: string): Promise<PortfolioDto> {
    return this.portfoliosService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: SubjectType })
  @ApiOkResponse({ type: PortfolioDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.update({ id, updatePortfolioDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: SubjectType })
  @ApiOkResponse({ type: PortfolioDto })
  remove(@User() user: IUser, @Param('id') id: string): Promise<PortfolioDto> {
    return this.portfoliosService.remove({ id, user });
  }

  @Get(':id/roles')
  @CheckAbilities(
    { action: Action.Read, subject: SubjectType },
    { action: Action.Read, subject: 'Role' },
  )
  @ApiPaginatedResponse(RoleDto)
  findRoles(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<WithCount<RoleDto>> {
    const where: Prisma.RoleWhereInput = { portfolioId: id };
    return this.rolesService.findAll({ user, pageOptionsDto, where });
  }

  @Get(':id/properties')
  @CheckAbilities(
    { action: Action.Read, subject: SubjectType },
    { action: Action.Read, subject: 'Property' },
  )
  @ApiPaginatedResponse(PropertyDto)
  findProperties(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<WithCount<PropertyDto>> {
    const where: Prisma.PropertyWhereInput = { portfolioId: { equals: id } };
    return this.propertiesService.findAll({ user, pageOptionsDto, where });
  }

  @Get(':id/units')
  @CheckAbilities(
    { action: Action.Read, subject: SubjectType },
    { action: Action.Read, subject: 'Unit' },
  )
  @ApiPaginatedResponse(UnitDto)
  findUnits(
    @User() user: IUser,
    @Query() pageOptionsDto: PageOptionsDto,
    @Param('id') id: string,
  ): Promise<WithCount<UnitDto>> {
    const where: Prisma.UnitWhereInput = {
      property: { portfolioId: { equals: id } },
    };
    return this.unitsService.findAll({ user, pageOptionsDto, where });
  }

  // @Get(':id/files')
  // @CheckAbilities({ action: Action.Read, subject: SubjectType})
  // @ApiPaginatedResponse(FileDto)
  // findFiles(
  //   @User() user: IUser,
  //   @Query() pageOptionsDto: PageOptionsDto,
  //   @Param('id') id: string,
  // ): Promise<WithCount<FileDto>> {
  //   const where: Prisma.FileWhereInput = {
  //     property: { portfolioId: { equals: id } },
  //   };
  //   return this.filesService.findAll({ user, pageOptionsDto });
  // }
}
