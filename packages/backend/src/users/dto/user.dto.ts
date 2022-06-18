import { User } from '@prisma/client';

// TODO add roles
export class UserDto implements User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  fullName: string | null;
  roles: Roles;
}

interface Roles {
  admins: Role[];
  portfolios: Role[];
  tenants: Role[];
}

interface Role {
  organizationId: string;
}
