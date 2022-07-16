import { IntersectionType } from '@nestjs/swagger';
import { DashboardFilterDto } from 'src/analytics/dto/analytics.dto';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class LeaseInvoiceOptionsDto extends IntersectionType(
  PageOptionsDto,
  DashboardFilterDto,
) {}
