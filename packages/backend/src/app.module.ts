import { CacheModule, Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// common
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AbilitiesGuard } from 'src/casl/abilities.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AnalyticsModule } from './analytics/analytics.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { PostmarkModule } from './postmark/postmark.module';
import { PostmarkService } from './postmark/postmark.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrometheusModule } from './prometheus/prometheus.module';
import { SearchModule } from './search/search.module';

// resources
import { ExpensesModule } from './expenses/expenses.module';
import { LeaseInvoicesModule } from './lease-invoices/lease-invoices.module';
import { LeasesModule } from './leases/leases.module';
import { MetaModule } from './meta/meta.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { PropertiesModule } from './properties/properties.module';
import { RolesModule } from './roles/roles.module';
import { TenantsModule } from './tenants/tenants.module';
import { UnitsModule } from './units/units.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    PrismaModule,
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
    HealthModule,
    PrometheusModule,
    MetricsModule,
    SearchModule,
    RolesModule,
    OrganizationsModule,
    AnalyticsModule,
    MetaModule,
    EventEmitterModule.forRoot(),
    PostmarkModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
      scope: Scope.REQUEST,
    },
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard }, // parses JWT and sets user in request
    { provide: APP_GUARD, useClass: AbilitiesGuard },
    PostmarkService,
  ],
})
export class AppModule {}
