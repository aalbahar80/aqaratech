import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { CaslExceptionFilter } from 'src/casl/forbidden-error.filter';
import { ROLE_HEADER } from 'src/constants/header-role';
import { PrismaExceptionFilter } from 'src/prisma/prisma-exception.filter';
import { setupSwagger } from 'src/swagger';
import { getMiddleware } from 'swagger-stats';
import { AppModule } from './app.module';

async function bootstrap() {
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
      allowedHeaders: ['Authorization', ROLE_HEADER, 'Content-Type'],
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
      disableErrorMessages: process.env.AQ_DEBUG_NEST == '1',
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
