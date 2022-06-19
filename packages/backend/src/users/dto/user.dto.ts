import { Prisma, Role, User } from '@prisma/client';

class RoleDto implements Role {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: Prisma.JsonValue;
  userId: string | null;
  organizationId: string | null;
  portfolioId: string | null;
  tenantId: string | null;
}

export class UserDto implements User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  fullName: string | null;
  roles: RoleDto[];
}
