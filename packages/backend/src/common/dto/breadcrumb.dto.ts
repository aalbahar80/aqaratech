import { ApiProperty } from '@nestjs/swagger';
import { Rel } from 'src/constants/rel.enum';
import { getAddress, getUnitLabel } from 'src/utils/address';

type TenantLabelParams = {
  id: string;
  rel: Rel.Tenant;
  fullName: string;
};
interface PortfolioLabelParams {
  id: string;
  rel: Rel.Portfolio;
  fullName: string;
}
interface PropertyLabelParams {
  id: string;
  rel: Rel.Property;
  area: string | null;
  block: string | null;
  number: string | null;
}
interface UnitLabelParams {
  id: string;
  rel: Rel.Unit;
  type: string | null;
  unitNumber: string;
}
interface LeaseLabelParams {
  id: string;
  rel: Rel.Lease;
}
interface MOParams {
  id: string;
  rel: Rel.MaintenanceOrder;
}

type BreadcrumbDtoParameters =
  | TenantLabelParams
  | PortfolioLabelParams
  | PropertyLabelParams
  | UnitLabelParams
  | LeaseLabelParams
  | MOParams;

// interface BreadcrumbDtoParameters {
//   labelParams: LabelParams;
// }

export class BreadcrumbDto {
  @ApiProperty({ enum: Rel })
  rel: Rel;

  @ApiProperty()
  href: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  label: string;

  constructor(labelParams: BreadcrumbDtoParameters) {
    const { rel, id } = labelParams;
    this.rel = rel;
    this.id = id;

    if (rel === Rel.Tenant) {
      this.href = `/tenants/${id}`;
      this.label = labelParams.fullName;
    } else if (rel === Rel.Portfolio) {
      this.href = `/portfolios/${id}`;
      this.label = labelParams.fullName;
    } else if (rel === Rel.Property) {
      this.href = `/properties/${id}`;
      this.label = getAddress(labelParams);
    } else if (rel === Rel.Unit) {
      this.href = `/units/${id}`;
      this.label = getUnitLabel(labelParams);
    } else if (rel === Rel.Lease) {
      this.href = `/portfolios/${id}`;
      this.label = labelParams.id;
    } else if (rel === Rel.MaintenanceOrder) {
      this.href = `/maintenanceOrders/${id}`;
      this.label = labelParams.id;
    }
  }
}

export class BreadcrumbsDto {
  // @ApiProperty({ readOnly: true })
  tenant: BreadcrumbDto;

  @ApiProperty({ readOnly: true })
  portfolio: BreadcrumbDto;

  @ApiProperty({ readOnly: true })
  property: BreadcrumbDto;

  @ApiProperty({ readOnly: true })
  unit: BreadcrumbDto;

  @ApiProperty({ readOnly: true })
  lease: BreadcrumbDto;
}
