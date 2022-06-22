import { UserDto } from 'src/users/dto/user.dto';

export const mockUser: UserDto = {
  id: '1',
  email: 'a@example.com',
  fullName: 'Test User',
  createdAt: new Date(),
  updatedAt: new Date(),
  roles: [
    {
      id: '1',
      organizationId: '1',
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      portfolioId: null,
      tenantId: null,
      permissions: null,
    },
  ],
};
