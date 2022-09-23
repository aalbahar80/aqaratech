import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeasesService } from './leases.service';

describe('LeasesService', () => {
	let service: LeasesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [LeasesService, PrismaService, CaslAbilityFactory],
		}).compile();

		service = module.get<LeasesService>(LeasesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
