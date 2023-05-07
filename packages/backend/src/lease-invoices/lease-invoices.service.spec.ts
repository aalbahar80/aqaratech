import { Test } from '@nestjs/testing';

import { EnvModule } from 'src/env/env.module';
import { NovuService } from 'src/novu/novu.service';
import { PrismaService, createPrismaClient } from 'src/prisma/prisma.service';
import prismaService from 'src/test/__mocks__/prisma';
import { tokenMocker } from 'test/util';
import prisma from 'test/util/prisma';

import { LeaseInvoicesService } from './lease-invoices.service';

const invoice = {
	id: '1',
	amount: 2,
	postAt: new Date(),
	portfolioId: '3',
	organizationId: '4',
	lease: {
		tenant: {
			id: '5',
			phone: '1234567890',
			roles: [{ user: { email: 'user@example.com' } }],
		},
	},
};

describe('LeaseInvoicesService', () => {
	let service: LeaseInvoicesService;
	let novuService: NovuService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [LeaseInvoicesService],
			imports: [EnvModule],
		})
			.useMocker(tokenMocker)
			.compile();

		service = moduleRef.get(LeaseInvoicesService);
		novuService = moduleRef.get(NovuService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should call sendSMS once', async () => {
		const spy = vi.spyOn(novuService, 'sendSMS');

		await service.notify({
			method: 'SMS',
			invoice,
		});

		expect(spy).toHaveBeenCalledOnce();
	});

	it('should call sendSMS with correct arguments', async () => {
		const spy = vi.spyOn(novuService, 'sendSMS');

		await service.notify({
			method: 'SMS',
			invoice,
		});

		const template = {
			to: {
				subscriberId: '5',
				phone: '1234567890',
			},
			payload: {
				link: `${process.env.PUBLIC_API_URL}/leaseInvoices/1/pay`,
			},
		};

		expect(spy).toHaveBeenCalledWith('INVOICE_REMINDER', template);
	});
});

describe('Invoice reminders - Paused', () => {
	let service: LeaseInvoicesService;

	beforeEach(async () => {
		// @ts-expect-error vitest
		import.meta.env.PAUSE_AUTO_INVOICE_REMINDERS = '1';

		const moduleRef = await Test.createTestingModule({
			providers: [LeaseInvoicesService],
			imports: [EnvModule],
		})
			.useMocker(tokenMocker)
			.compile();

		service = moduleRef.get(LeaseInvoicesService);
	});

	it('should abort cron job', async () => {
		await expect(service.sendReminders()).resolves.toBe(false);
	});
});

describe('Invoice reminders', () => {
	let service: LeaseInvoicesService;

	beforeEach(async () => {
		// @ts-expect-error vitest
		import.meta.env.PAUSE_AUTO_INVOICE_REMINDERS = '0';

		const moduleRef = await Test.createTestingModule({
			providers: [LeaseInvoicesService],
			imports: [EnvModule],
		})
			.useMocker(tokenMocker)
			.compile();

		service = moduleRef.get(LeaseInvoicesService);
	});

	it('should run cron job', async () => {
		prismaService.c.leaseInvoice.findMany.mockResolvedValueOnce([]);
		await expect(service.sendReminders()).resolves.not.toBe(false);
	});

	it('notify each invoice', async () => {
		prismaService.c.leaseInvoice.findMany.mockResolvedValueOnce([
			{},
			{},
		] as any);

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).toHaveBeenCalledTimes(2);
	});
});

describe('Invoice reminders - data', () => {
	let service: LeaseInvoicesService;

	beforeEach(async () => {
		// @ts-expect-error vitest
		import.meta.env.PAUSE_AUTO_INVOICE_REMINDERS = '0';

		const moduleRef = await Test.createTestingModule({
			providers: [LeaseInvoicesService],
			imports: [EnvModule],
		})
			.useMocker((token) => {
				// use the real PrismaService (we want to test it)
				if (token === PrismaService) {
					return {
						c: createPrismaClient(),
					};
				}
				return tokenMocker(token);
			})
			.compile();

		service = moduleRef.get(LeaseInvoicesService);
	});

	it('should not notify if invoice is already paid', async () => {
		const invoices = await prisma.leaseInvoice.createMany({
			data: [
				{
					amount: 1,
					isPaid: false,
					postAt: new Date(),
					leaseId: '1',
					portfolioId: '1',
					organizationId: '1',
				},
			],
		});

		console.log({ invoices });

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).not.toHaveBeenCalled();
	});

	it('should notify unpaid invoices', async () => {
		await prisma.tenant.create({
			data: {
				id: '1',
				organizationId: '1',
			},
		});

		await prisma.lease.create({
			data: {
				id: '1',
				notify: true,
				start: new Date(),
				end: new Date(),
				monthlyRent: 1,
				organizationId: '1',
				portfolioId: '1',
				unitId: '1',
				tenantId: '1',
			},
		});

		await prisma.leaseInvoice.createMany({
			data: [
				{
					amount: 1,
					isPaid: false,
					postAt: new Date(),
					leaseId: '1',
					portfolioId: '1',
					organizationId: '1',
				},
				{
					amount: 1,
					isPaid: false,
					postAt: new Date(),
					leaseId: '1',
					portfolioId: '1',
					organizationId: '1',
				},
			],
		});

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).toHaveBeenCalledTimes(2);
	});

	it.only('insert basic records', async () => {
		await prisma.organization.create({
			data: {
				id: '1',
			},
		});

		await prisma.tenant.create({
			data: {
				id: '1',
				organizationId: '1',
			},
		});

		await prisma.portfolio.create({
			data: {
				id: '1',
				organizationId: '1',
			},
		});

		await prisma.property.create({
			data: {
				id: '1',
				organizationId: '1',
				portfolioId: '1',
			},
		});

		await prisma.unit.create({
			data: {
				id: '1',
				unitNumber: '1',
				organizationId: '1',
				portfolioId: '1',
				propertyId: '1',
			},
		});

		await prisma.lease.create({
			data: {
				id: '1',
				start: new Date(),
				end: new Date(),
				monthlyRent: 1,
				organizationId: '1',
				tenantId: '1',
				portfolioId: '1',
				unitId: '1',
			},
		});

		await prisma.leaseInvoice.create({
			data: {
				amount: 1,
				postAt: new Date(),
				organizationId: '1',
				portfolioId: '1',
				leaseId: '1',
			},
		});

		await prisma.expense.create({
			data: {
				amount: 1,
				postAt: new Date(),
				organizationId: '1',
				portfolioId: '1',
			},
		});
	});
});
