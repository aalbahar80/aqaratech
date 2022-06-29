import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import * as cookieParser from 'cookie-parser';
import { writeFileSync } from 'fs';
import { dump } from 'js-yaml';
import { CaslExceptionFilter } from 'src/casl/forbidden-error.filter';
import { PrismaExceptionFilter } from 'src/prisma/prisma-exception.filter';
import { AppModule } from './app.module';

import { ExpensesModule } from 'src/expenses/expenses.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UnitsModule } from 'src/units/units.module';
import { UsersModule } from 'src/users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'warn', 'error'],
    cors: true, // TODO adjust in prod
  });

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

  const config = new DocumentBuilder()
    .setTitle('Aqaratech API')
    .setDescription('The Aqratech API description')
    .setVersion('1.0')
    .addTag('aqaratech')
    .addServer('http://localhost:3002')
    .addSecurityRequirements('oauth-swagger')
    .addOAuth2(
      {
        type: 'oauth2',
        // scheme: 'Bearer',
        flows: {
          authorizationCode: {
            authorizationUrl:
              'https://dev-eehvhdp2.eu.auth0.com/authorize?audience=letand.be/api',
            tokenUrl: 'https://dev-eehvhdp2.eu.auth0.com/oauth/token',
            scopes: {
              'openid profile email': 'default scope',
              openid:
                "to indicate that the application intends to use OIDC to verify the user's identity",
              profile: 'to get name, nickname, and picture',
              email: 'to get email and email_verified',
            },
          },
        },
      },
      'oauth-swagger',
    )
    .build();

  Sentry.init({
    // dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
    dsn: 'https://c0020b9f9062452a826fcb956eb7f542@o1210217.ingest.sentry.io/6528733',
    tracesSampleRate: 1.0,
    serverName: 'Aqaratech API - Nest',
    environment: 'nestjs-dev',
    enabled: false,
  });

  const document = SwaggerModule.createDocument(app, config, {
    include: [
      AppModule,
      UsersModule,
      TenantsModule,
      PortfoliosModule,
      PropertiesModule,
      UnitsModule,
      LeasesModule,
      LeaseInvoicesModule,
      ExpensesModule,
    ],
    operationIdFactory(controllerKey, methodKey) {
      const controller = controllerKey.replace(/Controller$/, '');
      return `${methodKey}${controller}`;
    },
  });
  // move below?
  writeFileSync('./openapi.json', JSON.stringify(document));
  writeFileSync(
    './openapi.yaml',
    dump(document, {
      // schema: 'http://json-schema.org/draft-04/schema#',
    }),
  );

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      // https://github.com/nestjs/swagger/issues/1828#issuecomment-1084833100
      oauth: {
        clientId: 'z6oqyOuPLao6XhJeCje9tZ8ZbiJa5zct',
        clientSecret:
          'uSR4Gjf3XNN-1kfZGuppDqRdbz7XD6A4o2g8yY1GdZgqCXeYhWhdqfPUoIIJLBRf',
        scopes: ['openid', 'profile', 'email'], // default scopes to request
      },
      persistAuthorization: true,
    },
  });

  await app.listen(3002);
}

void bootstrap();
