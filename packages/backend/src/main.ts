import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import '@sentry/tracing';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { envCheck } from '@self/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { setupSwagger } from 'src/swagger';

import { version } from '../package.json';

import { AppModule } from './app.module';

Logger.log(version, 'AqaratechConfig');

async function bootstrap() {
	Logger.log(`Version: ${version}`);
	envCheck();

	const app = await NestFactory.create(AppModule, {
		cors: {
			origin: process.env.PUBLIC_SITE_URL,
			credentials: true,
			allowedHeaders: [
				'Authorization',
				'Cookie',
				'Content-Type',
				'x-sws-authenticated',
				'baggage', // sentry
				'sentry-trace', // sentry
			],
			maxAge: 24 * 60 * 60,
		},
	});

	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

	app.use(helmet()); // before other middleware
	app.use(cookieParser());

	// https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	if (process.env.PUBLIC_AQARATECH_ENV === 'development' && !process.env.CI) {
		await setupSwagger(app);
	} else {
		Logger.warn('Swagger is not enabled in production/staging');
	}

	await app.listen(3002);
}
void bootstrap();
