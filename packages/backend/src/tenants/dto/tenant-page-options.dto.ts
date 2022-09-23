import { PageOptionsDto } from '../../common/dto/page-options.dto';

export class TenantPageOptionsDto extends PageOptionsDto {
	override take = 20;
}
