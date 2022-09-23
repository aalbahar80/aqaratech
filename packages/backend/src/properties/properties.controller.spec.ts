import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';

describe('PropertiesController', () => {
	let controller: PropertiesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PropertiesController],
			providers: [PropertiesService, PrismaService, CaslAbilityFactory],
		}).compile();

		controller = module.get<PropertiesController>(PropertiesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
