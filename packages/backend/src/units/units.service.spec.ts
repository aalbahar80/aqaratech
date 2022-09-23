import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { UnitsService } from './units.service';

describe('UnitsService', () => {
	let service: UnitsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UnitsService, PrismaService, CaslAbilityFactory],
		}).compile();

		service = module.get<UnitsService>(UnitsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
