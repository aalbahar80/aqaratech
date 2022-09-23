import { forwardRef, Module } from '@nestjs/common';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { RolesModule } from 'src/roles/roles.module';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';

@Module({
	controllers: [TenantsController],
	providers: [TenantsService],
	exports: [TenantsService],
	imports: [RolesModule, LeaseInvoicesModule, forwardRef(() => LeasesModule)],
})
export class TenantsModule {}
