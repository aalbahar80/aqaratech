import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ExpenseTypeDto } from 'src/expenses/dto/expense-type.dto';
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
}
