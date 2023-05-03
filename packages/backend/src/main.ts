import {
	INestApplication,
	Logger,
	NestApplicationOptions,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import '@sentry/tracing';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import kill from 'tree-kill';

import { envSchema } from '@self/utils';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { setupSwagger } from 'src/swagger';

import { version } from '../package.json';

Logger.log(version, 'AqaratechConfig');

const options = {
	// snapshot: !isLiveEnv(process.env.PUBLIC_AQARATECH_ENV),
	abortOnError: false,
	cors: {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		origin: process.env.PUBLIC_SITE_URL!,
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
} satisfies NestApplicationOptions;

async function bootstrap() {
	let app: INestApplication;
	const env = envSchema
		.pick({
			PUBLIC_AQARATECH_ENV: true,
			PUBLIC_IS_TESTING: true,
		})
		.parse(process.env);

	if (env.PUBLIC_IS_TESTING) {
		const createTestApp = (await import('./test/create-app.stub'))
			.createTestApp;
		app = await createTestApp(options);
	} else {
		app = await NestFactory.create(AppModule, options);
	}

	Logger.log(`Version: ${version}`);

	app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

	app.use(helmet()); // before other middleware
	app.use(cookieParser());

	// https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);

	if (process.env['GENERATE_SWAGGER'] === '1') {
		await setupSwagger(app);
		console.log('Exiting after generating swagger');
		kill(process.pid);
	} else {
		Logger.warn('Swagger is not enabled in production/staging');
	}

	await app.listen(3002);
}

void bootstrap();

process.on('unhandledRejection', (error) => {
	// By default, Nestjs will crash and exit if an error is thrown during an
	// event handler (when not in dev)

	console.error('Unhandled Rejection caught. Logging and exiting.');
	console.error(error);

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (Logger) {
		Logger.error(error); // pretty print stack trace
	}

	process.exit(1);
});
