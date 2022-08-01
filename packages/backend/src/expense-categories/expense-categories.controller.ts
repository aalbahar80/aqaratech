import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense-categories.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';

@Controller('expense-categories')
export class ExpenseCategoriesController {
  constructor(private readonly expenseCategoriesService: ExpenseCategoriesService) {}

  @Post()
  create(@Body() createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return this.expenseCategoriesService.create(createExpenseCategoryDto);
  }

  @Get()
  findAll() {
    return this.expenseCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return this.expenseCategoriesService.update(+id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseCategoriesService.remove(+id);
  }
}
