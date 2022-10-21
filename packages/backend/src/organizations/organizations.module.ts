import { Module } from '@nestjs/common';
import { OrganizationsAdminController } from 'src/organizations/organizations-admin.controller';
import { PortfoliosModule } from 'src/portfolios/portfolios.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { RolesModule } from 'src/roles/roles.module';
import { S3Module } from 'src/s3/s3.module';
import { SearchModule } from 'src/search/search.module';
import { TenantsModule } from 'src/tenants/tenants.module';
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
	],
})
export class OrganizationsModule {}
