import { writeFileSync } from 'fs';

import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Cookie } from '@self/utils';

import { AggregateModule } from 'src/aggregate/aggregate.module';
import { BreadcrumbDto, BreadcrumbsDto } from 'src/common/dto/breadcrumb.dto';
import { PaginatedMetaDto } from 'src/common/dto/paginated.dto';
import { ExpenseCategoriesModule } from 'src/expense-categories/expense-categories.module';
import { ExpensesModule } from 'src/expenses/expenses.module';
import { FilesModule } from 'src/files/files.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { MaintenanceOrdersModule } from 'src/maintenance-orders/maintenance-orders.module';
import { OrganizationsModule } from 'src/organizations/organizations.module';
import { PayoutsModule } from 'src/payouts/payouts.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { RolesModule } from 'src/roles/roles.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UnitsModule } from 'src/units/units.module';
import { UsersModule } from 'src/users/users.module';

export const setupSwagger = async (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Aqaratech')
		.setDescription('Aqaratech API')
		.setVersion('1.0')
		.addCookieAuth(Cookie.accessToken, {
			type: 'apiKey',
		})
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		include: [
			UsersModule,
			TenantsModule,
			PortfoliosModule,
			PropertiesModule,
			UnitsModule,
			LeasesModule,
			LeaseInvoicesModule,
			ExpensesModule,
			RolesModule,
			OrganizationsModule,
			AggregateModule,
			ExpenseCategoriesModule,
			FilesModule,
			PayoutsModule,
			MaintenanceOrdersModule,
		],
		extraModels: [BreadcrumbDto, BreadcrumbsDto, PaginatedMetaDto],
		ignoreGlobalPrefix: true,
	});

	try {
		Logger.log('Setting up swagger...');
		const { dump } = await import('js-yaml');
		// For consumption of swagger-ui
		writeFileSync(
			'./openapi.yaml',
			dump(document, {
				// schema: 'http://json-schema.org/draft-04/schema#',
			}),
		);

		SwaggerModule.setup('swagger', app, document, {
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
	} catch (e) {
		Logger.error('Could not write swagger file');
		Logger.error(e);
	}

	return document;
};
