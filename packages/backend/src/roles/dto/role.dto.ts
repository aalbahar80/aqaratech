import {
  ApiProperty,
  IntersectionType,
  OmitType,
  PartialType,
} from '@nestjs/swagger';
import { Role, RoleType } from '@prisma/client';
import { IsBoolean, IsEmail, IsEnum } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { Nanoid } from 'src/decorators/field.decorators';

class RoleRequiredDto {
  @Nanoid()
  organizationId: string;

  @ApiProperty({ enum: RoleType, enumName: 'RoleTypeEnum' })
  @IsEnum(RoleType)
  roleType: RoleType;

  @IsEmail()
  email: string;
}

class RoleOptionalDto {
  @Nanoid()
  portfolioId: string | null;

  @Nanoid()
  tenantId: string | null;

  @IsBoolean()
  isAccepted: boolean;

  @IsBoolean()
  isDefault: boolean;

  // permissions: Prisma.JsonValue;
}

export class RoleDto extends IntersectionType(
  AbstractDto,
  IntersectionType(OmitType(RoleRequiredDto, ['email']), RoleOptionalDto),
) {
  userId: string;
  email?: string;
}

export class CreateRoleDto
  extends IntersectionType(RoleRequiredDto, PartialType(RoleOptionalDto))
  implements Partial<Role> {}

// export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
