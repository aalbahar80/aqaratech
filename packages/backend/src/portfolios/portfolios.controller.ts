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
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { Org } from 'src/decorators/org.decorator';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/users/dto/user.dto';
import { PortfolioDto, UpdatePortfolioDto } from './dto/portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
@ApiTags('portfolios')
@SwaggerAuth()
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Portfolio' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: PortfolioDto })
  create(
    @User() user: UserDto,
    @Org() orgId: string,
    @Body() createPortfolioDto: PortfolioDto,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.create({ createPortfolioDto, user, orgId });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Portfolio' })
  @ApiPaginatedResponse(PortfolioDto)
  findAll(
    @User() user: UserDto,
    @Query() portfolioPageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<PortfolioDto>> {
    return this.portfoliosService.findAll({ portfolioPageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Portfolio' })
  @ApiOkResponse({ type: PortfolioDto })
  findOne(
    @User() user: UserDto,
    @Param('id') id: string,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Portfolio' })
  @ApiOkResponse({ type: PortfolioDto })
  update(
    @User() user: UserDto,
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.update({ id, updatePortfolioDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Portfolio' })
  @ApiOkResponse({ type: PortfolioDto })
  remove(
    @User() user: UserDto,
    @Param('id') id: string,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.remove({ id, user });
  }
}
