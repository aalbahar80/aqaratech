import { forwardRef, Module } from '@nestjs/common';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UnitsModule } from 'src/units/units.module';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';

@Module({
  controllers: [LeasesController],
  providers: [LeasesService],
  exports: [LeasesService],
  imports: [
    TenantsModule,
    PropertiesModule,
    forwardRef(() => UnitsModule),
    LeaseInvoicesModule,
  ],
})
export class LeasesModule {}
