import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { AppModule } from './app.module';

import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { UsersModule } from 'src/users/users.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipNullProperties: true,
      enableDebugMessages: true,
      // forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      whitelist: true,
      validateCustomDecorators: true,
      //  disableErrorMessages: true, // TODO prod only
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Aqaratech API')
    .setDescription('The Aqratech API description')
    .setVersion('1.0')
    .addTag('aqaratech')
    .addOAuth2(
      {
        type: 'oauth2',
        scheme: 'bearer',
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
    dsn: 'https://9b3cb0c95789401ea34643252fed4173@o1210217.ingest.sentry.io/6345874',
    tracesSampleRate: 1.0,
    environment: 'nestjs-dev',
    enabled: false,
  });

  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, UsersModule, TenantsModule, PortfoliosModule],
  });
  // move below?
  writeFileSync('./openapi.json', JSON.stringify(document));
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

bootstrap();
