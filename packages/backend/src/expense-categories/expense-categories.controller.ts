import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBody,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger';
import {
	expenseCategoryCreateSchema,
	expenseCategoryTreeSchema,
	expenseCategoryUpdateSchema,
} from '@self/utils';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { AuthzGuard } from 'src/casl/authz.guard';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
	CreateExpenseCategoryDto,
	ExpenseCategoryDto,
	UpdateExpenseCategoryDto,
	UpdateExpenseCategoryTreeDto,
} from 'src/expense-categories/expense-category.dto';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { ExpenseCategoriesService } from './expense-categories.service';

@Controller('organizations/:organizationId/expense-categories')
@ApiTags('expense-categories')
@SwaggerAuth()
export class ExpenseCategoriesController {
	constructor(
		private readonly expenseCategoriesService: ExpenseCategoriesService,
	) {}

	@Post()
	@CheckAbilities({ action: Action.Create, subject: 'ExpenseCategory' })
	@UseGuards(AuthzGuard)
	@ApiCreatedResponse({ type: String })
	create(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(expenseCategoryCreateSchema))
		createExpenseCategoryDto: CreateExpenseCategoryDto,
	): Promise<string> {
		return this.expenseCategoriesService.create({
			organizationId,
			createExpenseCategoryDto,
			user,
		});
	}

	@Get()
	// OrgId is trusted (inferred from the token). Therefore, being able to read an expense is sufficient.
	@CheckAbilities({ action: Action.Read, subject: 'Expense' })
	@ApiOkResponse({ type: ExpenseCategoryDto, isArray: true })
	findAll(
		@Param('organizationId') organizationId: string,
	): Promise<ExpenseCategoryDto[]> {
		return this.expenseCategoriesService.findAll({
			organizationId,
		});
	}

	@Patch()
	@CheckAbilities({ action: Action.Update, subject: 'Organization' })
	@ApiOkResponse({ type: ExpenseCategoryDto, isArray: true })
	@ApiBody({ type: UpdateExpenseCategoryTreeDto, isArray: true })
	updateAll(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Body(new ZodValidationPipe(expenseCategoryTreeSchema))
		updateExpenseCategoryTreeDto: UpdateExpenseCategoryTreeDto[],
	): Promise<ExpenseCategoryDto[]> {
		return this.expenseCategoriesService.updateAll({
			organizationId,
			updateExpenseCategoryTreeDto,
			user,
		});
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: 'Organization' })
	@ApiOkResponse({ type: String })
	update(
		@User() user: IUser,
		@Param('organizationId') organizationId: string,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(expenseCategoryUpdateSchema))
		updateExpenseCategoryDto: UpdateExpenseCategoryDto,
	): Promise<string> {
		return this.expenseCategoriesService.update({
			organizationId,
			expenseCategoryId: id,
			updateExpenseCategoryDto,
			user,
		});
	}
}
