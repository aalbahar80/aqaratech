import { Module } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeasesController } from './leases.controller';

@Module({
  controllers: [LeasesController],
  providers: [LeasesService]
})
export class LeasesModule {}
