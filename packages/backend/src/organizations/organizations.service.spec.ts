import { ForbiddenError } from '@casl/ability';
import { Test } from '@nestjs/testing';
import tierOriginal from 'tier';
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended';

import { tierid } from '@self/utils';
import { EnvModule } from 'src/env/env.module';
import { EnvService } from 'src/env/env.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { tokenMocker } from 'test/util/mocker';

import { OrganizationsService } from './organizations.service';

describe('OrganizationsService', () => {
	let service: OrganizationsService;
	let prismaService: DeepMockProxy<PrismaService>;
	let env: EnvService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [OrganizationsService],
			imports: [EnvModule],
		})
			.useMocker(tokenMocker)
			.compile();

		service = moduleRef.get(OrganizationsService);
		prismaService = moduleRef.get(PrismaService);
		env = moduleRef.get(EnvService);
	});

	it('should unsubscribe org after deletion', async () => {
		vi.mock('tier');
		const tier = vi.mocked(tierOriginal);
		// vi.mock('@casl/ability', () => mockDeep());
		vi.spyOn(ForbiddenError, 'from').mockReturnValue(mockDeep());

		prismaService.c.organization.delete.mockResolvedValueOnce({} as any);
		const spy = vi.spyOn(tier, 'cancel').mockResolvedValue({});

		await service.remove({ id: '123', user: { ability: {} } } as any);

		expect(spy).toHaveBeenCalledOnce();
		expect(spy).toHaveBeenCalledWith(tierid('123'));
	});

	it('should pause usage reports', async () => {
		env.e.STRIPE_PAUSE_USAGE_REPORTS = true;
		await expect(service.reportUsageAll()).resolves.toBe(false);
	});

	it('should resume usage reports', async () => {
		env.e.STRIPE_PAUSE_USAGE_REPORTS = false;
		prismaService.c.organization.findMany.mockResolvedValue([{}, {}] as any);
		await expect(service.reportUsageAll()).resolves.toBe(true);
	});

	it('should report usage for each org', async () => {
		env.e.STRIPE_PAUSE_USAGE_REPORTS = false;
		prismaService.c.organization.findMany.mockResolvedValue([{}, {}] as any);
		const spy = vi.spyOn(service, 'reportUsage');
		await service.reportUsageAll();
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should report usage', async () => {
		env.e.STRIPE_PAUSE_USAGE_REPORTS = false;
		prismaService.c.organization.findMany.mockResolvedValueOnce([{}] as any);
		const tier = vi.mocked(tierOriginal);
		const spy = vi.spyOn(tier, 'report');
		await service.reportUsage({ id: '123', _count: { Unit: 10 } } as any);
		expect(spy).toHaveBeenCalledWith(
			tierid('123'),
			'feature:unit',
			10,
			expect.anything(),
		);
	});
});
