import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

describe('PortfoliosController', () => {
	let controller: PortfoliosController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PortfoliosController],
			providers: [PortfoliosService, PrismaService, CaslAbilityFactory],
		}).compile();

		controller = module.get<PortfoliosController>(PortfoliosController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
