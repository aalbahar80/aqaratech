import { Test, TestingModule } from '@nestjs/testing';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService, CaslAbilityFactory],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
