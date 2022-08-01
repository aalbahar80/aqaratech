import { Module } from '@nestjs/common';
import { ExpenseCategoriesService } from './expense-categories.service';
import { ExpenseCategoriesController } from './expense-categories.controller';

@Module({
  controllers: [ExpenseCategoriesController],
  providers: [ExpenseCategoriesService]
})
export class ExpenseCategoriesModule {}
