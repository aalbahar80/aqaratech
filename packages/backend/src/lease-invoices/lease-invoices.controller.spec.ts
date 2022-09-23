import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeaseInvoicesController } from './lease-invoices.controller';
import { LeaseInvoicesService } from './lease-invoices.service';

describe('LeaseInvoicesController', () => {
	let controller: LeaseInvoicesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [LeaseInvoicesController],
			providers: [LeaseInvoicesService, PrismaService, CaslAbilityFactory],
		}).compile();

		controller = module.get<LeaseInvoicesController>(LeaseInvoicesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
