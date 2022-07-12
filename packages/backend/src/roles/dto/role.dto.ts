import { IntersectionType, PartialType, PickType } from '@nestjs/swagger';
import { Prisma, Role } from '@prisma/client';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';
import { UserDto } from 'src/users/dto/user.dto';

class RoleRequiredDto extends PickType(UserDto, ['email']) {}

class RoleOptionalDto {
  // should be required?
  @Nanoid()
  userId: string | null;

  @Nanoid()
  organizationId: string | null;

  @Nanoid()
  portfolioId: string | null;

  @Nanoid()
  tenantId: string | null;

  permissions: Prisma.JsonValue;
}

export class RoleDto extends IntersectionType(
  AbstractDto,
  IntersectionType(RoleRequiredDto, RoleOptionalDto),
) {}

export class CreateRoleDto
  extends IntersectionType(RoleRequiredDto, PartialType(RoleOptionalDto))
  implements Partial<Role> {}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
