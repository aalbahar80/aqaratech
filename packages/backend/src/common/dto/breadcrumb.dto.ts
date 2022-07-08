import { ApiProperty } from '@nestjs/swagger';
import { Rel } from 'src/constants/rel.enum';

interface BreadcrumbDtoParameters {
  rel: Rel;
  id: string;
}

export class BreadcrumbDto {
  @ApiProperty({ enum: Rel })
  rel: Rel;

  @ApiProperty()
  href: string;

  @ApiProperty()
  id: string;

  constructor({ id, rel }: BreadcrumbDtoParameters) {
    this.rel = rel;
    this.id = id;

    if (rel === Rel.Tenant) {
      this.href = `/tenants/${id}`;
    } else if (rel === Rel.Portfolio) {
      this.href = `/portfolios/${id}`;
    } else if (rel === Rel.Property) {
      this.href = `/properties/${id}`;
    } else if (rel === Rel.Unit) {
      this.href = `/units/${id}`;
    } else if (rel === Rel.Lease) {
      this.href = `/portfolios/${id}`;
    } else if (rel === Rel.MaintenanceOrder) {
      this.href = `/maintenanceOrders/${id}`;
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
