import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

export class UserDto extends AbstractDto implements User {
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  fullName: string | null = null;
}

export class UpdateUserDto extends PartialType(UserDto) {}
