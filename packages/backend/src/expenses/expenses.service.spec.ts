import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpensesService } from './expenses.service';

describe('ExpensesService', () => {
	let service: ExpensesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ExpensesService, PrismaService, CaslAbilityFactory],
		}).compile();

		service = module.get<ExpensesService>(ExpensesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
