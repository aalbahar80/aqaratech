import { ApiProperty } from '@nestjs/swagger';

export class AbstractDto {
  @ApiProperty({ readOnly: true })
  id: string;

  @ApiProperty({ readOnly: true })
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  updatedAt: Date;
}
