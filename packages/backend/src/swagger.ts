import { ExpensesModule } from 'src/expenses/expenses.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UnitsModule } from 'src/units/units.module';
import { UsersModule } from 'src/users/users.module';
import { AppModule } from './app.module';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { dump } from 'js-yaml';
import { BreadcrumbDto, BreadcrumbsDto } from 'src/common/dto/breadcrumbs.dto';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Aqaratech API')
    .setDescription('The Aqratech API description')
    .setVersion('1.0')
    .addTag('aqaratech')
    .addServer('http://localhost:3002')
    .addServer('https://nestjs-dev.onrender.com')
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
    extraModels: [BreadcrumbDto, BreadcrumbsDto],
    operationIdFactory(controllerKey, methodKey) {
      const controller = controllerKey.replace(/Controller$/, '');
      return `${methodKey}${controller}`;
    },
  });

  // For consumption of swagger-ui
  writeFileSync(
    './openapi.yaml',
    dump(document, {
      // schema: 'http://json-schema.org/draft-04/schema#',
    }),
  );

  // For consumption of @self/sdk
  writeFileSync('../sdk/openapi.yaml', dump(document, {}));

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
};
