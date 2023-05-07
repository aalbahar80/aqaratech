import { Test } from '@nestjs/testing';
import { Novu } from '@novu/node';
import { Mocked } from 'vitest';

import { EnvModule } from 'src/env/env.module';
import { LeaseInvoicesService } from 'src/lease-invoices/lease-invoices.service';
import { NovuService } from 'src/novu/novu.service';
import { tokenMocker } from 'test/util';

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

// Example: https://vitest.dev/guide/mocking.html#example-2
vi.mock('@novu/node', () => {
	const Novu = vi.fn();
	Novu.prototype.trigger = vi.fn();
	return { Novu };
});

describe('Novu', () => {
	let novu: Mocked<Novu>;
	let service: NovuService;
	let invoiceService: LeaseInvoicesService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [NovuService, LeaseInvoicesService],
			imports: [EnvModule],
		})
			.useMocker(tokenMocker)
			.compile();

		service = moduleRef.get(NovuService);
		invoiceService = moduleRef.get(LeaseInvoicesService);
		novu = new Novu('') as Mocked<Novu>;
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
		expect(invoiceService).toBeDefined();
		expect(novu).toBeDefined();
	});

	it('should be called with the correct template name', async () => {
		await invoiceService.notify({
			method: 'SMS',
			invoice,
		});

		expect(novu.trigger).toHaveBeenCalledTimes(1);
		expect(novu.trigger).toHaveBeenCalledWith(
			'INVOICE_REMINDER',
			expect.anything(),
		);
	});

	it('should be called with the correct country code', async () => {
		await invoiceService.notify({
			method: 'SMS',
			invoice,
		});

		expect(novu.trigger).toHaveBeenCalledTimes(1);
		expect(novu.trigger).toHaveBeenCalledWith(
			expect.anything(),
			expect.objectContaining({
				to: expect.objectContaining({
					phone: expect.stringMatching(/^\+965/),
				}),
			}),
		);
	});
});
