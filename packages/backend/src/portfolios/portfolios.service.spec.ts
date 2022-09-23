import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { PortfoliosService } from './portfolios.service';

describe('PortfoliosService', () => {
	let service: PortfoliosService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PortfoliosService, PrismaService, CaslAbilityFactory],
		}).compile();

		service = module.get<PortfoliosService>(PortfoliosService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
