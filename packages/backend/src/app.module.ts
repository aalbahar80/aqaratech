import {
	CacheModule,
	ClassSerializerInterceptor,
	MiddlewareConsumer,
	Module,
	RequestMethod,
} from '@nestjs/common';


// common
import { RouteInfo } from '@nestjs/common/interfaces';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SentryInterceptor, SentryModule } from '@ntegral/nestjs-sentry';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { WinstonModule } from 'nest-winston';

import { AppController } from 'src/app.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AbilitiesGuard } from 'src/casl/abilities.guard';

import configuration from './config/configuration';
import { LogtailModule } from './logtail/logtail.module';
import { PostmarkModule } from './postmark/postmark.module';
import { PostmarkService } from './postmark/postmark.service';
import { PrismaModule } from './prisma/prisma.module';
import { S3Module } from './s3/s3.module';
import { SearchModule } from './search/search.module';

// resources
import { RoleGuard } from 'src/casl/role.guard';
import { WinstonConfigService } from 'src/config/winston-config.service';
import { HttpLoggerService } from 'src/http-logger/HttpLogger.service';
import { ResponseInterceptor } from 'src/http-logger/response.interceptor';
import { ErrorsInterceptor } from 'src/interceptors/error.interceptor';
import { TimeoutInterceptor } from 'src/interceptors/timeout.interceptor';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';
import { LoggingMiddleware } from 'src/middleware/logging.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { S3Service } from 'src/s3/s3.service';
import { TraceMiddleware } from 'src/sentry/trace.middleware';
import { AggregateModule } from './aggregate/aggregate.module';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ExpenseCategoriesModule } from './expense-categories/expense-categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { FilesModule } from './files/files.module';
import { LeaseInvoicesModule } from './lease-invoices/lease-invoices.module';
import { LeasesModule } from './leases/leases.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PayoutsModule } from './payouts/payouts.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { PropertiesModule } from './properties/properties.module';
import { RolesModule } from './roles/roles.module';
import { TenantsModule } from './tenants/tenants.module';
import { UnitsModule } from './units/units.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		// Example for centralized config module: https://github.com/podkrepi-bg/api/blob/13eadd726f3ae45c49ef9be66b76c589e2394b16/apps/api/src/config/swagger.config.ts
		ConfigModule.forRoot({ load: [configuration], isGlobal: true }), // can take validation schema

		WinstonModule.forRootAsync({
			imports: [LogtailModule],
			useClass: WinstonConfigService,
		}),

		PrismaModule,

		// or use async: https://github.com/podkrepi-bg/api/blob/f62fba53eea6405539653c022c13f1d49990b93c/apps/api/src/app/app.module.ts#L60
		SentryModule.forRootAsync({
			// TODO: remove ConfigModule from imports
			imports: [ConfigModule],
			inject: [ConfigService, PrismaService],
			useFactory: (
				config: ConfigService<EnvironmentConfig>,
				prismaClient: PrismaService,
			) => {
				const sentryConfig = config.get('sentry', { infer: true });
				return {
					...sentryConfig,
					integrations: [
						// Enabling debug will make sentry list integrations on startup
						// More info: https://docs.sentry.io/platforms/node/configuration/integrations/default-integrations/
						// enable HTTP calls tracing
						new Sentry.Integrations.Http({
							tracing: true,
							breadcrumbs: true,
						}),

						// Potential troublemaker. Investigate: shutdown hooks, add prisma to imports array, prisma in main.ts vs using nestjs-prisma package.
						new Tracing.Integrations.Prisma({ client: prismaClient }),
					],
				};
			},
		}),

		CacheModule.register({ isGlobal: true }),
		TenantsModule,
		PortfoliosModule,
		CaslModule,
		AuthModule,
		UsersModule,
		PropertiesModule,
		UnitsModule,
		LeasesModule,
		LeaseInvoicesModule,
		ExpensesModule,
		SearchModule,
		RolesModule,
		OrganizationsModule,
		AggregateModule,
		EventEmitterModule.forRoot(),
		PostmarkModule,
		ExpenseCategoriesModule,
		S3Module,
		FilesModule,
		PayoutsModule,
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ErrorsInterceptor,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: TimeoutInterceptor,
		},
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useFactory: () => new SentryInterceptor(),
		},
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
		{ provide: APP_GUARD, useClass: RoleGuard },
		{ provide: APP_GUARD, useClass: AbilitiesGuard },
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
		S3Service,
		PostmarkService,
		HttpLoggerService,
	],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer): void {
		const healthCheck: RouteInfo = {
			path: 'health',
			method: RequestMethod.GET,
		};

		consumer.apply(LoggingMiddleware).exclude(healthCheck).forRoutes('*');
		consumer.apply(TraceMiddleware).exclude(healthCheck).forRoutes('*');
	}
}
