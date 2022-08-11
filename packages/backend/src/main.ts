import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { CaslExceptionFilter } from 'src/casl/forbidden-error.filter';
import { PrismaExceptionFilter } from 'src/prisma/prisma-exception.filter';
import { setupSwagger } from 'src/swagger';
import { getMiddleware } from 'swagger-stats';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: [
      ...(process.env?.AQ_DEBUG_NEST == '1' ? ['debug'] : ([] as any[])),
      'log',
      'warn',
      'error',
    ],
    cors: true, // TODO adjust in prod
  });

  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      // validateCustomDecorators: true, // fails eveything?
      enableDebugMessages: true, // TODO prod remove
      //  disableErrorMessages: true, // TODO prod only
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter(), new CaslExceptionFilter());

  const document = setupSwagger(app);

  app.use(
    getMiddleware({
      swaggerSpec: document,
      authentication: false,
      // hostname: process.env.PUBLIC_API_URL,
      // onAuthenticate: function (req: any, username: string, password: string) {
      // simple check for username and password
      // return username === 'username' && password === 'password';
      // },
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
