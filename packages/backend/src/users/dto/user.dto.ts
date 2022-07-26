import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { AbstractDto } from 'src/common/dto/abstract.dto';
import { RoleDto } from 'src/roles/dto/role.dto';

export class UserDto extends AbstractDto implements User {
  @IsEmail()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  fullName: string | null = null;
}

export class UpdateUserDto extends PartialType(UserDto) {}

/**
 * Type to be returned in /users-by-email endpoint,
 * then subsequently extracted by the jwt.strategy.ts
 * and placed in the request object.
 *
 * /users-by-email
 * Flow: user signs in through Auth0
 * -> jwt.strategy.ts extracts user's email from accesstoken places it in the request object
 * -> Abilities.guard calculates the user's `ability` and places it in `request.user.ability` `IUser interface`
 * ----> Applied globally. Respects `@Public` decorator.
 */
export class ValidatedUserDto extends UserDto {
  @ApiProperty({
    type: 'array',
    items: {
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
              },
            },
          },
        },
      ],
    },
  })
  roles: (RoleDto & { organization: { id: string; fullName: string } })[];
}
