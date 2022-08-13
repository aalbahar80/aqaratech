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
import { WithCount } from 'src/common/dto/paginated.dto';
import { ROLE_HEADER } from 'src/constants/header-role';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import { SwaggerAuth } from 'src/decorators/swagger-auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { ExpensePageOptionsDto } from 'src/expenses/dto/expense-page-options.dto';

import {
  CreateExpenseDto,
  ExpenseDto,
  UpdateExpenseDto,
} from 'src/expenses/dto/expense.dto';
import { IUser } from 'src/interfaces/user.interface';
import { ExpensesService } from './expenses.service';

@ApiHeader({ name: ROLE_HEADER })
@Controller('expenses')
@ApiTags('expenses')
@SwaggerAuth()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @CheckAbilities({ action: Action.Create, subject: 'Expense' })
  @ApiCreatedResponse({ type: String })
  create(
    @User() user: IUser,
    @Body() createExpenseDto: CreateExpenseDto,
  ): Promise<string> {
    return this.expensesService.create({ createExpenseDto, user });
  }

  @Get()
  @ApiPaginatedResponse(ExpenseDto)
  findAll(
    @User() user: IUser,
    @Query() pageOptionsDto: ExpensePageOptionsDto,
  ): Promise<WithCount<ExpenseDto>> {
    return this.expensesService.findAll({ pageOptionsDto, user });
  }

  @Get(':id')
  @ApiOkResponse({ type: ExpenseDto })
  findOne(@User() user: IUser, @Param('id') id: string): Promise<ExpenseDto> {
    return this.expensesService.findOne({ id, user });
  }

  @Patch(':id')
  @CheckAbilities({ action: Action.Update, subject: 'Expense' })
  @ApiOkResponse({ type: String })
  update(
    @User() user: IUser,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ): Promise<string> {
    return this.expensesService.update({ id, updateExpenseDto, user });
  }

  @Delete(':id')
  @ApiOkResponse({ type: String })
  remove(@User() user: IUser, @Param('id') id: string): Promise<string> {
    return this.expensesService.remove({ id, user });
  }
}
