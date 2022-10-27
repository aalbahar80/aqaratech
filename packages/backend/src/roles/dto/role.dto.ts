import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { RoleType } from '@prisma/client';
import { RoleCreateSchema } from '@self/utils';
import { IsBoolean, IsEmail, IsEnum } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { IsID } from 'src/decorators/field.decorators';

class RoleRequiredDto {
	@IsID()
	organizationId: string;

	@ApiProperty({ enum: RoleType, enumName: 'RoleTypeEnum' })
	@IsEnum(RoleType)
	roleType: RoleType;

	@IsEmail()
	email: string;
}

class RoleOptionalDto {
	@IsID()
	portfolioId: string | null;

	@IsID()
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

export class CreateRoleDto implements RoleCreateSchema {
	email: string;
}
