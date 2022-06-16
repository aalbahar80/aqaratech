import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PortfoliosController } from 'src/portfolios/portfolios.controller';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { PortfoliosModule } from './portfolios/portfolios.module';

import { TenantsController } from 'src/tenants/tenants.controller';
import { TenantsService } from 'src/tenants/tenants.service';
import { TenantsModule } from './tenants/tenants.module';

import { PrismaModule } from './prisma/prisma.module';

// should prisma be here or in local modules?
@Module({
  imports: [PortfoliosModule, TenantsModule, PrismaModule],
  controllers: [AppController, TenantsController, PortfoliosController],
  providers: [AppService, TenantsService, PortfoliosService],
})
export class AppModule {}
