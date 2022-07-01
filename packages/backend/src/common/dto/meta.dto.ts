import { ApiProperty } from '@nestjs/swagger';

// TODO rename to meta
export class HateoasDto {
  @ApiProperty({ readOnly: true })
  id: string;

  @ApiProperty({ readOnly: true })
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  updatedAt: Date;
}
