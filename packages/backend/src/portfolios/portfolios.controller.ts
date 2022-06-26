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
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
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
    @User() user: IUser,
    @Body() createPortfolioDto: PortfolioDto,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.create({ createPortfolioDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Portfolio' })
  @ApiPaginatedResponse(PortfolioDto)
  findAll(
    @User() user: IUser,
    @Query() portfolioPageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<PortfolioDto>> {
    return this.portfoliosService.findAll({ portfolioPageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Portfolio' })
  @ApiOkResponse({ type: PortfolioDto })
  findOne(@User() user: IUser, @Param('id') id: string): Promise<PortfolioDto> {
    return this.portfoliosService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Portfolio' })
  @ApiOkResponse({ type: PortfolioDto })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<PortfolioDto> {
    return this.portfoliosService.update({ id, updatePortfolioDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Portfolio' })
  @ApiOkResponse({ type: PortfolioDto })
  remove(@User() user: IUser, @Param('id') id: string): Promise<PortfolioDto> {
    return this.portfoliosService.remove({ id, user });
  }
}
