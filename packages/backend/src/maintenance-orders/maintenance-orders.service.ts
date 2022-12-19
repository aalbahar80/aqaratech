import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

import {
	CreateMaintenanceOrderDto,
	MaintenanceOrderDto,
	UpdateMaintenanceOrderDto,
} from './dto/maintenance-order.dto';

@Injectable()
export class MaintenanceOrdersService {
	constructor(private readonly prisma: PrismaService) {}

	create({
		createMaintenanceOrderDto,
		user,
		organizationId,
	}: {
		createMaintenanceOrderDto: CreateMaintenanceOrderDto;
		user: IUser;
		organizationId: string;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Create,
			// @ts-expect-error use DateAsString
			subject('MaintenanceOrder', {
				...createMaintenanceOrderDto,
				organizationId,
			}),
		);

		const { portfolioId, propertyId, unitId, tenantId, ...data } =
			createMaintenanceOrderDto;

		const mo = this.prisma.maintenanceOrder.create({
			data: {
				...data,
				organization: { connect: { id: organizationId } },
				portfolio: { connect: { id: portfolioId } },
				...(propertyId ? { property: { connect: { id: propertyId } } } : {}),
				...(unitId ? { unit: { connect: { id: unitId } } } : {}),
				...(tenantId ? { tenant: { connect: { id: tenantId } } } : {}),
			},
		});

		return plainToInstance(MaintenanceOrderDto, mo);
	}

	async findAll({
		queryOptions,
		user,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
	}): Promise<WithCount<MaintenanceOrderDto>> {
		const { take, skip, sort } = queryOptions;

		const filter: Prisma.MaintenanceOrderWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).MaintenanceOrder,
				queryOptions.filter,
			],
		};

		const [data, total] = await Promise.all([
			this.prisma.maintenanceOrder.findMany({
				take,
				skip,
				orderBy: sort,
				where: filter,
				include: {
					portfolio: crumbs.portfolio,
					property: crumbs.property,
					unit: crumbs.unit,
					tenant: crumbs.tenant,
				},
			}),

			this.prisma.maintenanceOrder.count({ where: filter }),
		]);

		return { total, results: plainToInstance(MaintenanceOrderDto, data) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const data = await this.prisma.maintenanceOrder.findUniqueOrThrow({
			where: {
				id,
				AND: accessibleBy(user.ability, Action.Read).MaintenanceOrder,
			},
			include: {
				portfolio: crumbs.portfolio,
				property: crumbs.property,
				unit: crumbs.unit,
				tenant: crumbs.tenant,
			},
		});

		return plainToInstance(MaintenanceOrderDto, data);
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
		const data = await this.prisma.maintenanceOrder.update({
			where: {
				id,
				AND: accessibleBy(user.ability, Action.Update).MaintenanceOrder,
			},
			data: updateMaintenanceOrderDto,
		});

		return plainToInstance(MaintenanceOrderDto, data);
	}

	remove({ id, user }: { id: string; user: IUser }) {
		return this.prisma.maintenanceOrder.delete({
			where: {
				id,
				AND: accessibleBy(user.ability, Action.Delete).MaintenanceOrder,
			},
		});
	}
}
