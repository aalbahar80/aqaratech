import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  ExpenseTypeDto,
  UpdateExpenseTypeDto,
} from 'src/expenses/dto/expense-type.dto';
import { MetaService } from 'src/meta/meta.service';

@ApiTags('meta')
@Controller('meta')
export class MetaController {
  constructor(private readonly metaService: MetaService) {}

  @Get('types')
  @ApiOkResponse({ type: ExpenseTypeDto, isArray: true })
  findExpenseTypes(): Promise<ExpenseTypeDto[]> {
    return this.metaService.findExpenseTypes();
  }

  @Post('types')
  @ApiCreatedResponse({ type: UpdateExpenseTypeDto, isArray: true })
  saveExpenseTypes(
    @Body() updateExpenseTypesDto: UpdateExpenseTypeDto[],
  ): Promise<UpdateExpenseTypeDto[]> {
    return this.metaService.saveExpenseTypes({ updateExpenseTypesDto });
  }
}
