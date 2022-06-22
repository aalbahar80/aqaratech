import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Prisma, Role, User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';

class RoleDto extends AbstractDto implements Role {
  permissions: Prisma.JsonValue;
  userId: string | null;
  organizationId: string | null;
  portfolioId: string | null;
  tenantId: string | null;
}

export class UserDto extends AbstractDto implements User {
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  fullName: string | null = null;

  roles: RoleDto[];
}

export class UpdateUserDto extends PartialType(UserDto) {}
