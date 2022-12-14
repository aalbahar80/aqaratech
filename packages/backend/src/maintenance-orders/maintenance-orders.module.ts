import { Module } from '@nestjs/common';

import { MaintenanceOrdersController } from './maintenance-orders.controller';
import { MaintenanceOrdersService } from './maintenance-orders.service';

@Module({
	controllers: [MaintenanceOrdersController],
	providers: [MaintenanceOrdersService],
})
export class MaintenanceOrdersModule {}
