import { Test } from '@nestjs/testing';

import { EnvModule } from 'src/env/env.module';
import { NovuService } from 'src/novu/novu.service';

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

				if (typeof token === 'function') {
					const mock = vi.fn(token);
					return mock;
				}

				if (typeof token === 'symbol') {
					return token;
				}

				return;
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

		expect(spy).toHaveBeenCalledWith(template);
	});
});
