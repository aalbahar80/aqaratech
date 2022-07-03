import { forwardRef, Module } from '@nestjs/common';
import { PropertiesModule } from 'src/properties/properties.module';
import { TenantsModule } from 'src/tenants/tenants.module';
import { UnitsModule } from 'src/units/units.module';
import { LeasesController } from './leases.controller';
import { LeasesService } from './leases.service';

@Module({
  controllers: [LeasesController],
  providers: [LeasesService],
  exports: [LeasesService],
  imports: [TenantsModule, PropertiesModule, forwardRef(() => UnitsModule)],
})
export class LeasesModule {}
