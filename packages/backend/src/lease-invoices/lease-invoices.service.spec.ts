import { Test } from '@nestjs/testing';
import { DeepMockProxy } from 'vitest-mock-extended';

import { EnvModule } from 'src/env/env.module';
import { NovuService } from 'src/novu/novu.service';
import { MESSAGE_TAG } from 'src/postmark/tags';
import { PrismaService, createPrismaClient } from 'src/prisma/prisma.service';
import { tokenMocker } from 'test/util/mocker';
import prisma from 'test/util/prisma';
import { SAMPLE } from 'test/util/sample';

import { LeaseInvoicesService } from './lease-invoices.service';

import type { LeaseInvoice } from '@prisma/client';

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
		vi.spyOn(service, 'generatePaymentLink').mockResolvedValue('link');

		// insert invoice
		const spy = vi.spyOn(novuService, 'sendSMS');

		await service.notify({
			method: 'SMS',
			invoice,
		});

		expect(spy).toHaveBeenCalledOnce();
	});

	it('should call sendSMS with correct arguments', async () => {
		vi.spyOn(service, 'generatePaymentLink').mockResolvedValue('link');

		const spy = vi.spyOn(novuService, 'sendSMS');

		await service.notify({
			method: 'SMS',
			invoice,
		});

		const template = {
			tag: MESSAGE_TAG.INVOICE_REMINDER,
			subscriberId: '1', // invoice id
			phone: '1234567890',
			payload: {
				link: 'link',
			},
		};

		expect(spy).toHaveBeenCalledWith(template);
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
	let prismaService: DeepMockProxy<PrismaService>;

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
		prismaService = moduleRef.get(PrismaService);
	});

	it('should run cron job', async () => {
		prismaService.c.leaseInvoice.findMany.mockResolvedValueOnce([]);
		await expect(service.sendReminders()).resolves.not.toBe(false);
	});

	it('notify each invoice', async () => {
		prismaService.c.leaseInvoice.findMany.mockResolvedValueOnce([
			{},
			{},
		] as LeaseInvoice[]);

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

	it('should notify unpaid invoices', async () => {
		await prisma.lease.create({
			data: {
				id: '1',
				notify: true,
				...SAMPLE.lease,
			},
		});

		await prisma.leaseInvoice.createMany({
			data: [
				{
					...SAMPLE.leaseInvoice,
					id: '1',
					leaseId: '1',
					isPaid: false,
					postAt: new Date(),
				},
				{
					...SAMPLE.leaseInvoice,
					id: '2',
					leaseId: '1',
					isPaid: false,
					postAt: new Date(),
				},
			],
		});

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).toHaveBeenCalledTimes(2);

		expect(spy).toHaveBeenCalledWith(
			expect.objectContaining({
				invoice: expect.objectContaining({
					id: '1',
				}),
			}),
		);

		expect(spy).toHaveBeenCalledWith(
			expect.objectContaining({
				invoice: expect.objectContaining({
					id: '2',
				}),
			}),
		);
	});

	it('should not notify if invoice is already paid', async () => {
		await prisma.lease.create({
			data: {
				id: '1',
				notify: true,
				...SAMPLE.lease,
			},
		});

		await prisma.leaseInvoice.createMany({
			data: [
				{
					...SAMPLE.leaseInvoice,
					id: '1',
					leaseId: '1',
					isPaid: true,
					postAt: new Date(),
				},
			],
		});

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).not.toHaveBeenCalled();
	});

	it('should notify if lease is set to notify', async () => {
		await prisma.lease.create({
			data: {
				id: '1',
				notify: true,
				...SAMPLE.lease,
			},
		});

		await prisma.leaseInvoice.createMany({
			data: [
				{
					...SAMPLE.leaseInvoice,
					id: '1',
					leaseId: '1',
					isPaid: false,
					postAt: new Date(),
				},
			],
		});

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).toHaveBeenCalled();
	});

	it('should not notify if lease is not set to notify', async () => {
		await prisma.lease.create({
			data: {
				id: '1',
				notify: false,
				...SAMPLE.lease,
			},
		});

		await prisma.leaseInvoice.createMany({
			data: [
				{
					...SAMPLE.leaseInvoice,
					id: '1',
					leaseId: '1',
					isPaid: false,
					postAt: new Date(),
				},
			],
		});

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).not.toHaveBeenCalled();
	});

	it('should not notify future invoices', async () => {
		await prisma.lease.create({
			data: {
				id: '1',
				notify: true,
				...SAMPLE.lease,
			},
		});

		await prisma.leaseInvoice.createMany({
			data: [
				{
					...SAMPLE.leaseInvoice,
					id: '1',
					leaseId: '1',
					isPaid: false,
					postAt: new Date(Date.now() + 86400000),
				},
			],
		});

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).not.toHaveBeenCalled();
	});

	it('should not notify if invoice postDate is not this month', async () => {
		await prisma.lease.create({
			data: {
				id: '1',
				notify: true,
				...SAMPLE.lease,
			},
		});

		await prisma.leaseInvoice.createMany({
			data: [
				{
					...SAMPLE.leaseInvoice,
					id: '1',
					leaseId: '1',
					isPaid: false,
					postAt: new Date(Date.now() - 86400000 * 35),
				},
			],
		});

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).not.toHaveBeenCalled();
	});
});
