import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeaseInvoicesService } from './lease-invoices.service';

describe('LeaseInvoicesService', () => {
	let service: LeaseInvoicesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LeaseInvoicesService, PrismaService, CaslAbilityFactory],
		}).compile();

		service = module.get<LeaseInvoicesService>(LeaseInvoicesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
