import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { CaslExceptionFilter } from 'src/casl/forbidden-error.filter';
import { ROLE_HEADER } from 'src/constants/header-role';
import { PrismaExceptionFilter } from 'src/prisma/prisma-exception.filter';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentryInterceptor } from 'src/sentry/sentry.interceptor';
import { setupSwagger } from 'src/swagger';
import { version } from '../package.json';
import { AppModule } from './app.module';

Sentry.init({
  // TODO use environment variable to set the DSN
  dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
  tracesSampleRate: +(process.env.PUBLIC_TRACE_RATE ?? 0.1),
  environment: process.env.PUBLIC_AQARATECH_ENV,
  debug: process.env.PUBLIC_AQ_DEBUG_SENTRY === '1',
  release: version,
});

async function bootstrap() {
  console.log(`Version: ${version}`);
  if (!process.env.PUBLIC_SITE_URL) {
    console.error('PUBLIC_SITE_URL is not set');
  } else {
    console.log('PUBLIC_SITE_URL: ', process.env.PUBLIC_SITE_URL);
  }

  const app = await NestFactory.create(AppModule, {
    logger: [
      ...(process.env?.AQ_DEBUG_NEST == '1' ? ['debug'] : ([] as any[])),
      'log',
      'warn',
      'error',
    ],
    cors: {
      origin: process.env.PUBLIC_SITE_URL,
      allowedHeaders: [
        'Authorization',
        ROLE_HEADER,
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
      enableDebugMessages: process.env.AQ_DEBUG_NEST == '1',
      disableErrorMessages: false,
    }),
  );

  app.useGlobalInterceptors(new SentryInterceptor());

  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new PrismaExceptionFilter(), new CaslExceptionFilter());

  if (process.env.PUBLIC_AQARATECH_ENV === 'development' && !process.env.CI) {
    await setupSwagger(app);
  } else {
    console.warn('Swagger is not enabled in production/staging');
  }

  await app.listen(3002);
}
void bootstrap();
