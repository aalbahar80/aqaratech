import { Module } from '@nestjs/common';

import { ExpensesModule } from 'src/expenses/expenses.module';
import { FilesModule } from 'src/files/files.module';
import { LeaseInvoicesModule } from 'src/lease-invoices/lease-invoices.module';
import { LeasesModule } from 'src/leases/leases.module';
import { OrganizationsAdminController } from 'src/organizations/organizations-admin.controller';
import { OrganizationsController } from 'src/organizations/organizations.controller';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { OrganizationsSettingsService } from 'src/organizations/settings.service';
import { PayoutsModule } from 'src/payouts/payouts.module';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { RolesModule } from 'src/roles/roles.module';
import { SearchModule } from 'src/search/search.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { TierService } from 'src/tier/tier.service';
import { UnitsModule } from 'src/units/units.module';

@Module({
	controllers: [OrganizationsController, OrganizationsAdminController],
	providers: [OrganizationsService, OrganizationsSettingsService, TierService],
	imports: [
		RolesModule,
		SearchModule,
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
