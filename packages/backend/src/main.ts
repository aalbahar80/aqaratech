import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { URL } from 'node:url';
import { CaslExceptionFilter } from 'src/casl/forbidden-error.filter';
import { ROLE_HEADER } from 'src/constants/header-role';
import { PrismaExceptionFilter } from 'src/prisma/prisma-exception.filter';
import { PrismaService } from 'src/prisma/prisma.service';
import { SentryInterceptor } from 'src/sentry/sentry.interceptor';
import { setupSwagger } from 'src/swagger';
import { getMiddleware } from 'swagger-stats';
import { version } from '../package.json';
import { AppModule } from './app.module';

Sentry.init({
  // TODO use environment variable to set the DSN
  dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
  tracesSampleRate: process.env.PUBLIC_AQARATECH_ENV !== 'production' ? 0.5 : 1,
  environment: process.env.PUBLIC_AQARATECH_ENV,
  debug: process.env.AQ_DEBUG_NEST == '1',
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
  // app.use(
  //   // has to be after cookieParser()
  //   csurf({
  //     cookie: true,
  //   }),
  // );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      // validateCustomDecorators: true, // fails eveything?
      enableDebugMessages: process.env.AQ_DEBUG_NEST == '1',
      disableErrorMessages: process.env.AQ_DEBUG_NEST != '1',
    }),
  );

  app.useGlobalInterceptors(new SentryInterceptor());

  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.useGlobalFilters(new PrismaExceptionFilter(), new CaslExceptionFilter());

  const document = await setupSwagger(app);

  app.use(
    getMiddleware({
      swaggerSpec: document,
      hostname: new URL(process.env.PUBLIC_SITE_URL).host, // https://aqaratech.com
      uriPath: '/swagger-stats',
      // @ts-expect-error `cookiePath` is a custom option I added using `pnpm patch`.
      // Enables serving the swagger-stats UI behind a reverse proxy which strips the /api prefix.
      cookiePath: `${process.env.PUBLIC_ROUTE_PATH || ''}` + '/swagger-stats', // prod: /api/swagger-stats dev: /swagger-stats
      authentication: true,
      onAuthenticate: function (req: any, username: string, password: string) {
        return username === 'aq-admin' && password === 'aq-swaggerstats12';
      },
    }),
  );

  console.log('OpenApi schema generated');
  if (process.env.GENERATE_OPENAPI_SCHEMA) {
    console.log('Quitting...');
    await app.close();
    process.exit(0);
  } else {
    await app.listen(3002);
  }
}
void bootstrap();
