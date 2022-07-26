import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FindExpenseTreeDto } from 'src/meta/dto/find-expense-tree.dto';
import { MetaService } from 'src/meta/meta.service';
import { ExpenseCategoryDto } from 'src/organizations/dto/expenseCategory.dto';

@ApiTags('meta')
@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get('expenseTree')
  // TODO ability check
  @ApiOkResponse({ type: ExpenseCategoryDto, isArray: true })
  findExpenseTypes(
    @Query() findExpenseTreeDto: FindExpenseTreeDto,
  ): Promise<ExpenseCategoryDto[]> {
    return this.metaService.findExpenseTypes({ findExpenseTreeDto });
  }
}
