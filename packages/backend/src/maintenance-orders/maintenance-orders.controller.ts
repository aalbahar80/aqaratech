import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
	maintenanceOrderCreateSchema,
	maintenanceOrderUpdateSchema,
} from '@self/utils';

import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

import {
	CreateMaintenanceOrderDto,
	UpdateMaintenanceOrderDto,
} from './dto/maintenance-order.dto';
import { MaintenanceOrdersService } from './maintenance-orders.service';

@Controller()
@ApiTags('maintenance-orders')
export class MaintenanceOrdersController {
	constructor(
		private readonly maintenanceOrdersService: MaintenanceOrdersService,
	) {}

	@Post('organizations/:organizationId/maintenance-orders')
	create(
		@Param('organizationId') organizationId: string,
		@User() user: IUser,
		@Body(new ZodValidationPipe(maintenanceOrderCreateSchema))
		createMaintenanceOrderDto: CreateMaintenanceOrderDto,
	) {
		return this.maintenanceOrdersService.create({
			createMaintenanceOrderDto,
			organizationId,
			user,
		});
	}

	@Get(':id')
	findOne(@User() user: IUser, @Param('id') id: string) {
		return this.maintenanceOrdersService.findOne({ id, user });
	}

	@Patch('/maintenance-orders/:id')
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
