import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import {
	CreatedDto,
	DeletedDto,
	UpdatedDto,
} from 'src/common/dto/abstract.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	CreateUnitDto,
	UnitDto,
	UnitMinimalDto,
	UpdateUnitDto,
} from 'src/units/dto/unit.dto';

@Injectable()
export class UnitsService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Unit' as const;

	async create({
		createUnitDto,
		organizationId,
	}: {
		createUnitDto: CreateUnitDto;
		organizationId: string;
	}) {
		const { portfolioId, propertyId, ...rest } = createUnitDto;

		const created = await this.prisma.c.unit.create({
			data: {
				...rest,
				property: {
					connect: {
						id: propertyId,
						AND: [{ portfolioId }], // ensure property belongs to portfolio
					},
				},
				portfolio: {
					connect: {
						id: portfolioId,
						AND: [{ organizationId: organizationId }], // ensure portfolio belongs to organization
					},
				},
				organization: { connect: { id: organizationId } },
			},
		});

		return new CreatedDto(created);
	}

	async findAll({
		queryOptions,
		user,
		whereCustom,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
		whereCustom?: Prisma.UnitWhereInput;
	}): Promise<WithCount<UnitDto>> {
		const { take, skip, sort, filter } = queryOptions;

		const where = {
			AND: [
				accessibleBy(user.ability, Action.Read).Unit,
				...(whereCustom ? [whereCustom] : []),
				filter,
			],
		} satisfies Prisma.UnitWhereInput;

		const [data, total] = await Promise.all([
			this.prisma.c.unit.findMany({
				take,
				skip,
				orderBy: sort,
				where,
				include: {
					// TODO Add sorted index?
					// TODO optimize it. set aq_prisma_debug = 1 and see the query. n+1?
					leases: {
						select: { start: true, end: true },
						orderBy: { end: 'desc' },
					},
					property: crumbs.property,
					computed: {
						select: {
							title: true,
						},
					},
				},
			}),
			this.prisma.c.unit.count({ where }),
		]);

		return { total, results: data.map((u) => new UnitDto(u)) };
	}

	/**
	 * For use in dropdowns
	 */
	async findAllMinimal({
		queryOptions,
		user,
		whereCustom,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
		whereCustom?: Prisma.UnitWhereInput;
	}): Promise<WithCount<UnitMinimalDto>> {
		const { take, skip, sort, filter } = queryOptions;

		const where = {
			AND: [
				accessibleBy(user.ability, Action.Read).Unit,
				...(whereCustom ? [whereCustom] : []),
				filter,
			],
		} satisfies Prisma.UnitWhereInput;

		const [data, total] = await Promise.all([
			this.prisma.c.unit.findMany({
				take,
				skip,
				orderBy: sort,
				where,
				select: {
					id: true,
					type: true,
					unitNumber: true,
					propertyId: true,
					computed: {
						select: {
							title: true,
						},
					},
				},
			}),
			this.prisma.c.unit.count({ where }),
		]);

		return { total, results: data };
	}

	async findOne({ id, user }: { id: string; user: IUser }): Promise<UnitDto> {
		const data = await this.prisma.c.unit.findUniqueOrThrow({
			where: { id, AND: accessibleBy(user.ability, Action.Read).Unit },
			include: {
				leases: {
					select: { start: true, end: true },
					orderBy: { end: 'desc' },
				},
				property: crumbs.property,
				computed: {
					select: {
						title: true,
					},
				},
			},
		});

		return new UnitDto(data);
	}

	async update({
		id,
		updateUnitDto,
		user,
	}: {
		id: string;
		updateUnitDto: UpdateUnitDto;
		user: IUser;
	}) {
		const updated = await this.prisma.c.unit.update({
			where: { id, AND: accessibleBy(user.ability, Action.Update).Unit },
			data: updateUnitDto,
		});

		return new UpdatedDto(updated);
	}

	async remove({ id }: { id: string }) {
		await this.prisma.c.unit.delete({ where: { id } });

		return new DeletedDto({ id });
	}
}
