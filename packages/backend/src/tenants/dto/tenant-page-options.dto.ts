import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class TenantPageOptionsDto extends PageOptionsDto {
  override take: number = 20;
}
