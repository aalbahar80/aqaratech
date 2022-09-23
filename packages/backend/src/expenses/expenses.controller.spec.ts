import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

describe('ExpensesController', () => {
	let controller: ExpensesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ExpensesController],
			providers: [ExpensesService, PrismaService, CaslAbilityFactory],
		}).compile();

		controller = module.get<ExpensesController>(ExpensesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
