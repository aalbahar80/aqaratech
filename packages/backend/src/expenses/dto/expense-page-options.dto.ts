import { IntersectionType } from '@nestjs/swagger';
import { DashboardFilterDto } from 'src/aggregate/dto/aggregate.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class ExpensePageOptionsDto extends IntersectionType(
	PageOptionsDto,
	DashboardFilterDto,
) {}
