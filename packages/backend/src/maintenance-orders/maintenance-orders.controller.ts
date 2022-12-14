import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
} from '@nestjs/common';

import { maintenanceOrderUpdateSchema } from '@self/utils';

import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

import {
	CreateMaintenanceOrderDto,
	UpdateMaintenanceOrderDto,
} from './dto/maintenance-order.dto';
import { MaintenanceOrdersService } from './maintenance-orders.service';

@Controller('maintenance-orders')
export class MaintenanceOrdersController {
	constructor(
		private readonly maintenanceOrdersService: MaintenanceOrdersService,
	) {}

	@Post()
	create(
		@User() user: IUser,
		@Body() createMaintenanceOrderDto: CreateMaintenanceOrderDto,
	) {
		return this.maintenanceOrdersService.create({
			createMaintenanceOrderDto,
			user,
		});
	}

	@Get(':id')
	findOne(@User() user: IUser, @Param('id') id: string) {
		return this.maintenanceOrdersService.findOne({ id, user });
	}

	@Patch(':id')
	update(
		@User() user: IUser,
		@Param('id') id: string,
		@Body(new ZodValidationPipe(maintenanceOrderUpdateSchema))
		updateMaintenanceOrderDto: UpdateMaintenanceOrderDto,
	) {
		return this.maintenanceOrdersService.update({
			id,
			updateMaintenanceOrderDto,
			user,
		});
	}

	@Delete(':id')
	remove(@User() user: IUser, @Param('id') id: string) {
		return this.maintenanceOrdersService.remove({ id, user });
	}
}
