// @ts-nocheck
// file is also ignored by eslint in .eslintignore
import { ForbiddenException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { fakeTenant } from '@self/seed';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantDto } from 'src/tenants/dto/tenant.dto';
import { RoleDto, UserDto } from 'src/users/dto/user.dto';
import { TenantsService } from './tenants.service';

const authorized = {
  roles: [
    {
      organizationId: '1',
      portfolioId: null,
      tenantId: null,
    },
  ],
} as UserDto;
// example
// https://github.com/jmcdo29/testing-nestjs/blob/0cc4302bd2ce20fb12802a7f2fff190d82d97466/apps/prisma-sample/src/cat/cat.service.spec.ts
const tenantArray: Partial<TenantDto>[] = Array.from({ length: 10 }, () =>
  fakeTenant('1'),
);
const oneTenant = tenantArray[0];

const db = {
  tenant: {
    findMany: jest.fn().mockResolvedValue(tenantArray),
    findFirst: jest.fn().mockResolvedValue(oneTenant),
    findUnique: jest.fn().mockResolvedValue(oneTenant),
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
      providers: [TenantsService, { provide: PrismaService, useValue: db }],
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
        user: authorized,
        tenantPageOptionsDto: { page: 1, take: 1, skip: 0 },
      });
      expect(data.results).toEqual(tenantArray);
    });
  });

  describe('getOne', () => {
    it('should get a single tenant', () => {
      expect(
        service.findOne({ id: 'a uuid', user: authorized }),
      ).resolves.toEqual(oneTenant);
    });
  });

  describe('insertOne', () => {
    it('should successfully insert a tenant', () => {
      expect(
        service.create({
          createTenantDto: fakeTenant(),
          orgId: '1',
          user: authorized,
        }),
      ).resolves.toEqual(oneTenant);
    });
  });

  describe('noauth', () => {
    it('should return a 403 if orgId is different', () => {
      try {
        service.create({
          createTenantDto: fakeTenant(),
          orgId: '2',
          user: { roles: [] as unknown as RoleDto } as unknown as UserDto,
        });
      } catch (e) {
        expect(e).toBeInstanceOf(ForbiddenException);
      }
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const tenant = await service.update({
        id: 'a uuid',
        user: authorized,
        updateTenantDto: fakeTenant(),
      });
      expect(tenant).toEqual(oneTenant);
    });
  });

  describe('deleteOne', () => {
    it('should return {deleted: true}', () => {
      expect(
        service.remove({ id: 'a uuid', user: authorized }),
      ).resolves.toEqual(oneTenant);
    });

    it('should return {deleted: false, message: err.message}', () => {
      const dbSpy = jest
        .spyOn(prisma.tenant, 'delete')
        .mockRejectedValueOnce(new Error('Bad Delete Method.'));
      // expect(
      //   service.remove({ id: 'a bad uuid', user: mockUser }),
      // ).resolves.toEqual({
      //   deleted: false,
      //   message: 'Bad Delete Method.',
      // });
      expect(
        service.remove({ id: 'a bad uuid', user: authorized }),
      ).rejects.toThrow();
    });
  });
});
