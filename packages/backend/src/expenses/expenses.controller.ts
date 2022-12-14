import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { expenseUpdateSchema } from '@self/utils';

import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
	ExpenseDto,
	PartialExpenseDto,
	UpdateExpenseDto,
} from 'src/expenses/dto/expense.dto';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

import { ExpensesService } from './expenses.service';

const SubjectType = 'Expense';

@Controller('expenses')
@ApiTags('expenses')
@SwaggerAuth()
export class ExpensesController {
	constructor(private readonly expensesService: ExpensesService) {}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: ExpenseDto })
	findOne(@User() user: IUser, @Param('id') id: string): Promise<ExpenseDto> {
		return this.expensesService.findOne({ id, user });
	}

	@Patch(':id')
	@ApiOkResponse({ type: PartialExpenseDto })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(expenseUpdateSchema))
		updateExpenseDto: UpdateExpenseDto,
	): Promise<PartialExpenseDto> {
		return this.expensesService.update({ id, updateExpenseDto, user });
	}

	@Delete(':id')
	@CheckAbilities({ action: Action.Delete, subject: SubjectType })
	@ApiOkResponse({ type: String })
	remove(@User() user: IUser, @Param('id') id: string): Promise<string> {
		return this.expensesService.remove({ id, user });
	}
}
