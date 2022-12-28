import { PortfolioDto } from 'src/portfolios/dto/portfolio.dto';
import { PropertyDto } from 'src/properties/dto/property.dto';
import { TenantDto } from 'src/tenants/dto/tenant.dto';

export class SearchDto {
	tenants: TenantDto[];
	portfolios: PortfolioDto[];
	properties: PropertyDto[];
}
