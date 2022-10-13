import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import {
	CreateExpenseCategoryDto,
	ExpenseCategoryDto,
	UpdateAllExpenseCategoriesDto,
	UpdateExpenseCategoryDto,
} from 'src/expense-categories/expense-category.dto';
import { IUser } from 'src/interfaces/user.interface';
import { ExpenseCategoriesService } from './expense-categories.service';

@Controller('expense-categories')
@ApiTags('expense-categories')
@SwaggerAuth()
export class ExpenseCategoriesController {
	constructor(
		private readonly expenseCategoriesService: ExpenseCategoriesService,
	) {}

	@Post()
	@CheckAbilities({ action: Action.Update, subject: 'Organization' })
	@ApiCreatedResponse({ type: String })
	create(
		@User() user: IUser,
		@Body() createExpenseCategoryDto: CreateExpenseCategoryDto,
	): Promise<string> {
		return this.expenseCategoriesService.create({
			organizationId: user.role.organizationId,
			createExpenseCategoryDto,
			user,
		});
	}

	@Get()
	// OrgId is trusted (inferred from the token). Therefore, being able to read an expense is sufficient.
	@CheckAbilities({ action: Action.Read, subject: 'Expense' })
	@ApiOkResponse({ type: ExpenseCategoryDto, isArray: true })
	findAll(@User() user: IUser): Promise<ExpenseCategoryDto[]> {
		return this.expenseCategoriesService.findAll({
			organizationId: user.role.organizationId,
		});
	}

	@Patch()
	@CheckAbilities({ action: Action.Update, subject: 'Organization' })
	@ApiOkResponse({ type: ExpenseCategoryDto, isArray: true })
	updateAll(
		@User() user: IUser,
		@Body() updateAllExpenseCategoriesDto: UpdateAllExpenseCategoriesDto,
	): Promise<ExpenseCategoryDto[]> {
		return this.expenseCategoriesService.updateAll({
			organizationId: user.role.organizationId,
			updateAllExpenseCategoriesDto,
			user,
		});
	}

	@Patch(':id')
	@CheckAbilities({ action: Action.Update, subject: 'Organization' })
	@ApiOkResponse({ type: String })
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
	): Promise<string> {
		return this.expenseCategoriesService.update({
			organizationId: user.role.organizationId,
			expenseCategoryId: id,
			updateExpenseCategoryDto,
			user,
		});
	}
}
