import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { expenseUpdateSchema } from '@self/utils';
import { SkipAbilityCheck } from 'src/auth/public.decorator';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { ExpensePageOptionsDto } from 'src/expenses/dto/expense-page-options.dto';

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

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(ExpenseDto)
	findAll(
		@User() user: IUser,
		@Query() pageOptionsDto: ExpensePageOptionsDto,
	): Promise<WithCount<ExpenseDto>> {
		return this.expensesService.findAll({ pageOptionsDto, user });
	}

	@Get(':id')
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiOkResponse({ type: ExpenseDto })
	findOne(@User() user: IUser, @Param('id') id: string): Promise<ExpenseDto> {
		return this.expensesService.findOne({ id, user });
	}

	@Patch(':id')
	@SkipAbilityCheck() // TODO rm
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
