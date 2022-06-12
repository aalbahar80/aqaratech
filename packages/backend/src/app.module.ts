import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PortfoliosController } from 'src/portfolios/portfolios.controller';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { TenantsController } from 'src/tenants/tenants.controller';
import { TenantsService } from 'src/tenants/tenants.service';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { TenantsModule } from './tenants/tenants.module';

@Module({
  imports: [PortfoliosModule, TenantsModule],
  controllers: [AppController, TenantsController, PortfoliosController],
  providers: [AppService, TenantsService, PortfoliosService],
})
export class AppModule {}
