import { forwardRef, Module } from '@nestjs/common';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
  imports: [LeaseInvoicesModule, forwardRef(() => LeasesModule)],
})
export class TenantsModule {}
