import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO31661Alpha3,
  IsISO8601,
  IsPhoneNumber,
  IsUUID,
} from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @ApiPropertyOptional({ example: 'JD' })
  shortName?: string;

  @ApiPropertyOptional({ example: 'abc@example.com' })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+96599212976' })
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ example: '123456789012', minimum: 12, maximum: 12 })
  civilid?: string;

  @ApiPropertyOptional()
  @IsISO8601()
  dob?: Date;

  @ApiPropertyOptional()
  passportNum?: string;

  @ApiPropertyOptional({ example: 'KWT' })
  @IsISO31661Alpha3()
  nationality?: string;

  @ApiPropertyOptional()
  residencyNum?: string;

  @ApiPropertyOptional()
  @IsISO8601()
  residencyEnd?: Date;

  // Consider moving to header/extracting from x-role-id
  @ApiProperty({ example: '1859ea1b-a5bc-4961-a846-86347f18a4ab' })
  @IsUUID()
  organizationId: string;
}
