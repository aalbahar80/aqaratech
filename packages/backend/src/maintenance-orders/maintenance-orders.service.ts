import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';

import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

import {
	CreateMaintenanceOrderDto,
	UpdateMaintenanceOrderDto,
} from './dto/maintenance-order.dto';

@Injectable()
export class MaintenanceOrdersService {
	constructor(private readonly prisma: PrismaService) {}

	create(createMaintenanceOrderDto: CreateMaintenanceOrderDto) {
		console.log(createMaintenanceOrderDto);
		return 'This action adds a new maintenanceOrder';
	}

	findAll() {
		return `This action returns all maintenanceOrders`;
	}

	findOne(id: number) {
		return `This action returns a #${id} maintenanceOrder`;
	}

	async update({
		id,
		updateMaintenanceOrderDto,
		user,
	}: {
		id: string;
		updateMaintenanceOrderDto: UpdateMaintenanceOrderDto;
		user: IUser;
	}) {
		return this.prisma.maintenanceOrder.update({
			where: {
				id,
				AND: accessibleBy(user.ability, Action.Update).MaintenanceOrder,
			},
			data: updateMaintenanceOrderDto,
		});
	}

	remove(id: number) {
		return `This action removes a #${id} maintenanceOrder`;
	}
}
