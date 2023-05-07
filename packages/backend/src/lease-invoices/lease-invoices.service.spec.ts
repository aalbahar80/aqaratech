import { Test } from '@nestjs/testing';

import { EnvModule } from 'src/env/env.module';
import { NovuService } from 'src/novu/novu.service';
import prisma from 'src/test/__mocks__/prisma';
import { tokenMocker } from 'test/util';

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
			.useMocker((token) => {
				// mock NovuService to avoid sending SMS
				if (token === NovuService) {
					return {
						sendSMS: vi.fn().mockResolvedValue(undefined),
					};
				}
				return tokenMocker(token);
			})
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
		prisma.c.leaseInvoice.findMany.mockResolvedValue([]);
		await expect(service.sendReminders()).resolves.not.toBe(false);
	});

	it('notify each invoice', async () => {
		prisma.c.leaseInvoice.findMany.mockResolvedValue([{}, {}]);

		const spy = vi.spyOn(service, 'notify');

		await service.sendReminders();

		expect(spy).toHaveBeenCalledTimes(2);
	});

	it.todo('should not notify if invoice is already paid', async () => {
		// add invoices where isPaid is true
	});
});
