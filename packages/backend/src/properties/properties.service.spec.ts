import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertiesService } from './properties.service';

describe('PropertiesService', () => {
	let service: PropertiesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PropertiesService, PrismaService, CaslAbilityFactory],
		}).compile();

		service = module.get<PropertiesService>(PropertiesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
