import {
	ApiProperty,
	ApiPropertyOptional,
	OmitType,
	PartialType,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

import { AbstractDto } from 'src/common/dto/abstract.dto';
import { RoleDto } from 'src/roles/dto/role.dto';

export class UserRequiredDto implements Partial<User> {
	@IsEmail()
	email: string;

	@IsString()
	fullName: string;
}

export class CreateUserDto extends UserRequiredDto implements Partial<User> {}

export class UpdateUserDto extends PartialType(
	OmitType(CreateUserDto, ['email']),
) {}

export class UserDto extends AbstractDto implements User {
	@IsEmail()
	email: string;

	@ApiPropertyOptional()
	@IsString()
	fullName: string | null;
}

/**
 * Attach helpful info to the userDto for simpler consumption.
 */
export class ValidatedUserDto extends UserDto {
	@ApiProperty({
		type: 'array',
		items: {
			title: 'ValidatedRoleDto',
			allOf: [
				{ $ref: '#/components/schemas/RoleDto' },
				{
					type: 'object',
					required: ['organization'],
					properties: {
						organization: {
							type: 'object',
							required: ['id', 'fullName'],
							properties: {
								id: { type: 'string' },
								fullName: { type: 'string' },
								title: { type: 'string' },
							},
						},
					},
				},
			],
		},
	})
	roles: (RoleDto & {
		organization: { id: string; fullName: string; title: string };
	})[];
}
