import { SubjectType } from '@casl/ability';
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
	entity,
	maintenanceOrderCreateSchema,
	maintenanceOrderUpdateSchema,
} from '@self/utils';

import { CheckAbilities } from 'src/casl/abilities.decorator';
import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { ApiPaginatedResponse } from 'src/decorators/api-paginated-response';
import {
	ApiQueryOptions,
	QueryParser,
} from 'src/decorators/query-options.decorator';
import { User } from 'src/decorators/user.decorator';
import { IUser } from 'src/interfaces/user.interface';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';

import {
	CreateMaintenanceOrderDto,
	MaintenanceOrderDto,
	UpdateMaintenanceOrderDto,
} from './dto/maintenance-order.dto';
import { MaintenanceOrdersService } from './maintenance-orders.service';

const SubjectType = 'MaintenanceOrder';
const urlName = entity.maintenanceOrder.urlName;

@Controller()
@ApiTags('maintenance-orders')
export class MaintenanceOrdersController {
	constructor(
		private readonly maintenanceOrdersService: MaintenanceOrdersService,
	) {}

	@Post(`organizations/:organizationId/${urlName}`)
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

	@Get()
	@CheckAbilities({ action: Action.Read, subject: SubjectType })
	@ApiPaginatedResponse(MaintenanceOrderDto)
	@ApiQueryOptions()
	findAll(
		@User() user: IUser,
		@QueryParser() queryOptions: QueryOptionsDto,
	): Promise<WithCount<MaintenanceOrderDto>> {
		return this.maintenanceOrdersService.findAll({ queryOptions, user });
	}

	@Get(`${urlName}/:id`)
	findOne(@User() user: IUser, @Param('id') id: string) {
		return this.maintenanceOrdersService.findOne({ id, user });
	}

	@Patch(`${urlName}/:id`)
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

	@Delete(`${urlName}/:id`)
	remove(@User() user: IUser, @Param('id') id: string) {
		return this.maintenanceOrdersService.remove({ id, user });
	}
}
