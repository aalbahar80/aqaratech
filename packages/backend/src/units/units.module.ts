import { Module } from '@nestjs/common';
import { LeasesService } from 'src/leases/leases.service';
import { PropertiesService } from 'src/properties/properties.service';
import { TenantsService } from 'src/tenants/tenants.service';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, LeasesService, TenantsService, PropertiesService],
})
export class UnitsModule {}
