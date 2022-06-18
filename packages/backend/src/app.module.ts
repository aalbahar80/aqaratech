import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

import { PortfoliosController } from 'src/portfolios/portfolios.controller';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { PortfoliosModule } from './portfolios/portfolios.module';

import { TenantsController } from 'src/tenants/tenants.controller';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantsModule } from './tenants/tenants.module';

import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

// should prisma/auth be here or in local modules?
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    PrismaModule,
    TenantsModule,
    PortfoliosModule,
    CaslModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, TenantsController, PortfoliosController],
  providers: [AppService, TenantsService, PortfoliosService],
})
export class AppModule {}
