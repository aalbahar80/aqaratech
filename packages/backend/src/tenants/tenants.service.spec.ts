import { Test, TestingModule } from '@nestjs/testing';
import { fakeTenant } from '@self/seed';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { mockUser } from 'test/mock-user';
import { TenantsService } from './tenants.service';

// example
// https://github.com/jmcdo29/testing-nestjs/blob/0cc4302bd2ce20fb12802a7f2fff190d82d97466/apps/prisma-sample/src/cat/cat.service.spec.ts
const tenantArray: Partial<TenantDto>[] = Array.from(
  { length: 10 },
  fakeTenant,
);
const oneTenant = tenantArray[0];

const db = {
  tenant: {
    findMany: jest.fn().mockResolvedValue(tenantArray),
    findOne: jest.fn().mockResolvedValue(oneTenant),
    create: jest.fn().mockResolvedValue(oneTenant),
    update: jest.fn().mockResolvedValue(oneTenant),
    delete: jest.fn().mockResolvedValue(oneTenant),
    count: jest.fn().mockResolvedValue(tenantArray.length),
  },
};

describe('TenantsService', () => {
  let service: TenantsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantsService,
        { provide: PrismaService, useValue: db },
        CaslAbilityFactory,
      ],
    }).compile();

    service = module.get<TenantsService>(TenantsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of tenants', async () => {
      const data = await service.findAll({
        user: mockUser,
        tenantPageOptionsDto: { page: 1, take: 1, skip: 0 },
      });
      expect(data.results).toEqual(tenantArray);
    });
  });
});
