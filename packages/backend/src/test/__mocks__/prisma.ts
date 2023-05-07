import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

import { PrismaService } from 'src/prisma/prisma.service';

beforeEach(() => {
	mockReset(prisma);
});

const prisma = mockDeep<PrismaService>();
export default prisma;
