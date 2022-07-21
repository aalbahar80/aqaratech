import { IntersectionType, PartialType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsBoolean, IsEmail } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class RoleRequiredDto {
  @Nanoid()
  organizationId: string;
}

class RoleOptionalDto {
  @Nanoid()
  portfolioId: string | null = null;

  @Nanoid()
  tenantId: string | null = null;

  @IsBoolean()
  isAccepted: boolean;

  @IsBoolean()
  isDefault: boolean;

  // permissions: Prisma.JsonValue;
}

export class RoleDto extends IntersectionType(
  AbstractDto,
  IntersectionType(RoleRequiredDto, RoleOptionalDto),
) {}

export class CreateRoleDto
  extends IntersectionType(RoleRequiredDto, PartialType(RoleOptionalDto))
  implements Partial<Role>
{
  @IsEmail()
  email: string;
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
