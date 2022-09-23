import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

describe('TenantsController', () => {
	let controller: TenantsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TenantsController],
			providers: [TenantsService, PrismaService],
		}).compile();

		controller = module.get<TenantsController>(TenantsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
