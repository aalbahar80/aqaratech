import { Module } from '@nestjs/common';
import { PropertiesService } from 'src/properties/properties.service';
import { TenantsService } from 'src/tenants/tenants.service';
import { UnitsService } from 'src/units/units.service';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';

@Module({
  controllers: [LeasesController],
  providers: [LeasesService, UnitsService, TenantsService, PropertiesService],
})
export class LeasesModule {}
