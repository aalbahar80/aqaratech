import { Module } from '@nestjs/common';

import { ExpensesModule } from 'src/expenses/expenses.module';
import { FilesModule } from 'src/files/files.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { OrganizationsAdminController } from 'src/organizations/organizations-admin.controller';
import { PayoutsModule } from 'src/payouts/payouts.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { RolesModule } from 'src/roles/roles.module';
import { S3Module } from 'src/s3/s3.module';
import { SearchModule } from 'src/search/search.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UnitsModule } from 'src/units/units.module';

import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
	controllers: [OrganizationsController, OrganizationsAdminController],
	providers: [OrganizationsService],
	imports: [
		RolesModule,
		SearchModule,
		S3Module,
		TenantsModule,
		PortfoliosModule,
		PropertiesModule,
		UnitsModule,
		LeasesModule,
		LeaseInvoicesModule,
		ExpensesModule,
		PayoutsModule,
		FilesModule,
	],
})
export class OrganizationsModule {}
