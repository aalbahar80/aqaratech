import { Module } from '@nestjs/common';
import { LeasesService } from 'src/leases/leases.service';
import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

@Module({
  controllers: [UnitsController],
  providers: [UnitsService, LeasesService],
})
export class UnitsModule {}
