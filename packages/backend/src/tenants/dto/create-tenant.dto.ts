import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsISO31661Alpha3,
  IsISO8601,
  IsPhoneNumber,
} from 'class-validator';

export class CreateTenantDto {
  @ApiProperty({ example: 'John Doe' })
  fullName: string;

  @ApiPropertyOptional({ example: 'JD' })
  shortName?: string;

  @ApiPropertyOptional({ example: 'abc@example.com' })
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ example: '+96591234567' })
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
}
