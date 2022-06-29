import { ApiProperty } from '@nestjs/swagger';
import { REL } from 'src/constants/rel.enum';

export class BreadcrumbDto {
  @ApiProperty({ enum: REL })
  rel: REL;

  @ApiProperty()
  href: string;
}

export class BreadcrumbsDto {
  @ApiProperty({ readOnly: true })
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
