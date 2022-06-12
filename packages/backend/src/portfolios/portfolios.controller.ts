import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  create(@Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfoliosService.create(createPortfolioDto);
  }

  @Get()
  findAll() {
    return this.portfoliosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfoliosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfoliosService.update(+id, updatePortfolioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfoliosService.remove(+id);
  }
}
