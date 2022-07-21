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

export class ValidatedUserDto extends UserDto {
  @ApiProperty({
    type: 'array',
    items: {
      allOf: [
        { $ref: '#/components/schemas/RoleDto' },
        {
          type: 'object',
          properties: {
            organization: {
              type: 'object',
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
