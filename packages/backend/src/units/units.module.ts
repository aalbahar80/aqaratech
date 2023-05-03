import { Module } from '@nestjs/common';

import { LeasesModule } from 'src/leases/leases.module';

import { UnitsController } from './units.controller';
import { UnitsService } from './units.service';

@Module({
	controllers: [UnitsController],
	providers: [UnitsService],
	exports: [UnitsService],
	imports: [LeasesModule],
})
export class UnitsModule {}
