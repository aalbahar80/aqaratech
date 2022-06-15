import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsISO31661Alpha3, IsISO8601 } from 'class-validator';

export class CreateTenantDto {
  // @IsUUID()
  // id: string;

  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @ApiPropertyOptional({ example: 'JD' })
  shortName?: string;

  @ApiPropertyOptional({ example: 'abc@example.com' })
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '123' })
  orgId: string;

  @ApiPropertyOptional({ example: '123456789012', minimum: 12, maximum: 12 })
  civilid?: string;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsISO8601()
  dob?: Date;

  @ApiPropertyOptional({ example: '123' })
  passportNum?: string;

  @ApiPropertyOptional({ example: 'KWT' })
  @IsISO31661Alpha3()
  nationality?: string;

  @ApiPropertyOptional({ example: new Date().toISOString() })
  @IsISO8601()
  residencyEnd?: Date;

  //   @IsString()
  //   contactMethod?: string;
}
