import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';
import { UserDto } from 'src/users/dto/user.dto';

class RoleRequiredDto extends PickType(UserDto, ['email']) {}

class RoleOptionalDto {
  @Nanoid()
  organizationId: string | null = null;

  @Nanoid()
  portfolioId: string | null = null;

  @Nanoid()
  tenantId: string | null = null;

  // permissions: Prisma.JsonValue;
}

export class RoleDto extends IntersectionType(
  AbstractDto,
  IntersectionType(RoleRequiredDto, RoleOptionalDto),
) {}

export class CreateRoleDto
  extends IntersectionType(RoleRequiredDto, PartialType(RoleOptionalDto))
  implements Partial<Role> {}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
