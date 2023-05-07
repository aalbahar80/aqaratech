import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

import { PrismaService } from 'src/prisma/prisma.service';

beforeEach(() => {
	mockReset(prismaService);
});

/** Mocked Prisma service */
const prismaService = mockDeep<PrismaService>();
export default prismaService;
