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
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER_NAME } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { UserDto } from 'src/users/dto/user.dto';

import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { ExpenseDto, UpdateExpenseDto } from 'src/expenses/dto/expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
@ApiTags('expenses')
@SwaggerAuth()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Expense' })
  @ApiHeader({ name: ROLE_HEADER_NAME })
  @ApiCreatedResponse({ type: ExpenseDto })
  create(
    @User() user: UserDto,
    @Body() createExpenseDto: ExpenseDto,
  ): Promise<ExpenseDto> {
    return this.expensesService.create({ createExpenseDto, user });
  }

  @Get()
  @CheckAbilities({ action: Action.Read, subject: 'Expense' })
  @ApiPaginatedResponse(ExpenseDto)
  findAll(
    @User() user: UserDto,
    @Query() expensePageOptionsDto: PageOptionsDto,
  ): Promise<PaginatedMetaDto<ExpenseDto>> {
    return this.expensesService.findAll({ expensePageOptionsDto, user });
  }

  @Get(':id')
  @CheckAbilities({ action: Action.Read, subject: 'Expense' })
  @ApiOkResponse({ type: ExpenseDto })
  findOne(@User() user: UserDto, @Param('id') id: string): Promise<ExpenseDto> {
    return this.expensesService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Expense' })
  @ApiOkResponse({ type: ExpenseDto })
  update(
    @User() user: UserDto,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<ExpenseDto> {
    return this.expensesService.update({ id, updateExpenseDto, user });
  }

  @Delete(':id')
  @CheckAbilities({ action: Action.Delete, subject: 'Expense' })
  @ApiOkResponse({ type: ExpenseDto })
  remove(@User() user: UserDto, @Param('id') id: string): Promise<ExpenseDto> {
    return this.expensesService.remove({ id, user });
  }
}
