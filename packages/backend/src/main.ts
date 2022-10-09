import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { envCheck } from '@self/utils';
import '@sentry/tracing';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { CaslExceptionFilter } from 'src/casl/forbidden-error.filter';
import { getLogLevels } from 'src/constants/log-levels';
import { PrismaExceptionFilter } from 'src/prisma/prisma-exception.filter';
import { PrismaService } from 'src/prisma/prisma.service';
import { setupSwagger } from 'src/swagger';
import { version } from '../package.json';
import { AppModule } from './app.module';

Logger.log(version, 'AqaratechConfig');

async function bootstrap() {
	Logger.log(`Version: ${version}`);
	envCheck();

	const level = process.env.PUBLIC_AQ_DEBUG_LEVEL || ('info' as const);

	Logger.log(`Log level: ${level}`);

	const app = await NestFactory.create(AppModule, {
		logger: getLogLevels(level),
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

	app.use(helmet()); // before other middleware
	app.use(cookieParser());

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			forbidUnknownValues: true,
			forbidNonWhitelisted: true,
			whitelist: true,
			// validateCustomDecorators: true, // fails eveything?
			enableDebugMessages: process.env.PUBLIC_AQ_DEBUG_NEST == '1',
			disableErrorMessages: false,
		}),
	);

	// https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	app.useGlobalFilters(new PrismaExceptionFilter(), new CaslExceptionFilter());

	if (process.env.PUBLIC_AQARATECH_ENV === 'development' && !process.env.CI) {
		await setupSwagger(app);
	} else {
		Logger.warn('Swagger is not enabled in production/staging');
	}

	await app.listen(3002);
}
void bootstrap();
