import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsUUID } from 'class-validator';

class Role {
  @ApiProperty({ example: '73306383-93a8-4b61-a2f6-58866dcc2ae9' })
  @IsUUID()
  organizationId: string;
}

class Roles {
  admins: Role[];
  portfolios: Role[];
  tenants: Role[];
}

export class UserDto implements User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  fullName: string | null;
  roles: Roles;
}
