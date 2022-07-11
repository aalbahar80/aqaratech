import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import * as cookieParser from 'cookie-parser';
import { CaslExceptionFilter } from 'src/casl/forbidden-error.filter';
import { PrismaExceptionFilter } from 'src/prisma/prisma-exception.filter';
import { setupSwagger } from 'src/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'log', 'warn', 'error'],
    cors: true, // TODO adjust in prod
  });
  app.setGlobalPrefix('v1/api');

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      // forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      // validateCustomDecorators: true, // fails eveything?
      enableDebugMessages: true, // TODO prod remove
      //  disableErrorMessages: true, // TODO prod only
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter(), new CaslExceptionFilter());

  Sentry.init({
    // dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
    dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
    tracesSampleRate: 1.0,
    serverName: 'Aqaratech API - Nest',
    environment: 'nestjs-dev',
    enabled: false,
  });

  setupSwagger(app);
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
