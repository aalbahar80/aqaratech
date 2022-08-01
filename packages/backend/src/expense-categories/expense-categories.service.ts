import { Injectable } from '@nestjs/common';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';

@Injectable()
export class ExpenseCategoriesService {
  create(createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return 'This action adds a new expenseCategory';
  }

  findAll() {
    return `This action returns all expenseCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseCategory`;
  }

  update(id: number, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return `This action updates a #${id} expenseCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseCategory`;
  }
}
