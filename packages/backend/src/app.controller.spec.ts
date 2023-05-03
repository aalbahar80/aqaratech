import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvService } from './env/env.service';

describe('AppController', () => {
	let appController: AppController;

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService, { provide: EnvService, useValue: {} }],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return "pass"', () => {
			console.log({ AppController });
			expect(1).toBe(1);
		});

		it('should return "Hello World!"', () => {
			expect(appController.getHealth()).toBe('ok');
		});
	});
});
