import { NestApplicationOptions } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { AppModule } from 'src/app.module';

export async function createTestApp(options: NestApplicationOptions) {
	console.log('Creating test app');

	const moduleRef = await Test.createTestingModule({
		imports: [AppModule],
	}).compile();

	console.log('Test app is ready');

	const app = moduleRef.createNestApplication(options);

	return app;
}
