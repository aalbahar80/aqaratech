import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { MyfatoorahService } from './myfatoorah.service';
import {
	CreatePaymentLinkParams,
	MyfatoorahInvoiceData,
} from './types/myfatoorah.types';

describe('MyfatoorahService', () => {
	let service: MyfatoorahService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MyfatoorahService,
				{
					provide: WINSTON_MODULE_NEST_PROVIDER,
					useValue: {},
				},
			],
		}).compile();

		service = module.get<MyfatoorahService>(MyfatoorahService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('converts a CreatePaymentLinkParams to a MyfatoorahInvoiceData', () => {
		const params = {
			organizationId: 'org_123',
			callbackUrl: 'https://example.com',
			reference: '123',
			amount: 100,
			name: 'John Doe',
			email: 'abc@123.com',
			phone: '12345678',
		} satisfies CreatePaymentLinkParams;

		const result = service.toMyfatoorahObject(params);

		const expected = {
			UserDefinedField: 'org_123',
			CallBackUrl: 'https://example.com',
			CustomerReference: '123',
			InvoiceValue: 100,
			CustomerName: 'John Doe',
			CustomerEmail: 'abc@123.com',
			CustomerMobile: '12345678',
		} satisfies MyfatoorahInvoiceData;

		expect(result).toEqual(expected);
	});
});
