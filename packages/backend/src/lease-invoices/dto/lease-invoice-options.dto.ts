import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { DashboardFilterDto } from 'src/analytics/dto/analytics.dto';
import { GroupBy } from 'src/constants/group-by.enum';
import { PaidStatus } from 'src/constants/paid-status.enum';
import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class LeaseInvoiceOptionsDto extends IntersectionType(
  PageOptionsDto,
  DashboardFilterDto,
) {
  @ApiPropertyOptional({ enum: PaidStatus, enumName: 'PaidStatusEnum' })
  @IsEnum(PaidStatus)
  paidStatus: PaidStatus = PaidStatus.ALL;

  @ApiPropertyOptional({ enum: GroupBy, enumName: 'GroupByEnum' })
  @IsEnum(GroupBy)
  groupBy: GroupBy = GroupBy.NONE;
}
