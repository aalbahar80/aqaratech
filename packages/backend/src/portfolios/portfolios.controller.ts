import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';

import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
@ApiTags('portfolios')
@SwaggerAuth()
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  create(
    @Headers(ROLE_HEADER_NAME) roleId: string,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ) {
    return this.portfoliosService.create(createPortfolioDto);
  }

  @Get()
  findAll(@Headers(ROLE_HEADER_NAME) roleId: string) {
    return this.portfoliosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfoliosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ) {
    return this.portfoliosService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfoliosService.remove(+id);
  }
}
