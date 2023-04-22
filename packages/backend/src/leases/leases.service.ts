import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { CreatedDto, UpdatedDto } from 'src/common/dto/abstract.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import { CreateManyLeaseInvoicesDto } from 'src/lease-invoices/dto/lease-invoice.dto';
import {
	CreateLeaseDto,
	LeaseDto,
	UpdateLeaseDto,
} from 'src/leases/dto/lease.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeasesService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Lease' as const;

	async create({
		createLeaseDto,
		organizationId,
	}: {
		createLeaseDto: CreateLeaseDto;
		organizationId: string;
	}) {
		const created = await this.prisma.c.lease.create({
			data: {
				...createLeaseDto,
				organizationId,
			},
		});

		return new CreatedDto(created);
	}

	async findAll({
		queryOptions,
		user,
		where,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
		where?: Prisma.LeaseWhereInput;
	}): Promise<WithCount<LeaseDto>> {
		const { skip, take, sort } = queryOptions;

		const filter: Prisma.LeaseWhereInput = {
			AND: [
				accessibleBy(user.ability).Lease,
				...(where ? [where] : []),
				queryOptions.filter,
			],
		};

		const [data, total] = await Promise.all([
			this.prisma.c.lease.findMany({
				take,
				skip,
				where: filter,
				orderBy: sort,
				include: {
					tenant: crumbs.tenant,
					unit: crumbs.unit,
					computed: {
						select: {
							phase: true,
						},
					},
				},
			}),
			this.prisma.c.lease.count({ where: filter }),
		]);

		return { total, results: data.map((l) => new LeaseDto(l)) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const data = await this.prisma.c.lease.findUniqueOrThrow({
			where: { id, AND: accessibleBy(user.ability, Action.Read).Lease },
			include: {
				tenant: crumbs.tenant,
				unit: crumbs.unit,
				computed: {
					select: {
						phase: true,
					},
				},
			},
		});

		return new LeaseDto(data);
	}

	async update({
		id,
		updateLeaseDto,
		user,
	}: {
		id: string;
		updateLeaseDto: UpdateLeaseDto;
		user: IUser;
	}) {
		const updated = await this.prisma.c.lease.update({
			where: { id, AND: accessibleBy(user.ability, Action.Update).Lease },
			data: updateLeaseDto,
		});

		return new UpdatedDto(updated);
	}

	async remove({ id }: { id: string }) {
		const deleted = await this.prisma.c.lease.delete({ where: { id } });
		return deleted.id;
	}

	// ::: INVOICES :::

	async createInvoices({
		leaseId,
		createManyLeaseInvoicesDto,
		organizationId,
	}: {
		leaseId: string;
		createManyLeaseInvoicesDto: CreateManyLeaseInvoicesDto[];
		organizationId: string;
	}) {
		const updated = await this.prisma.c.lease.update({
			where: { id: leaseId },
			data: {
				leaseInvoices: {
					createMany: {
						data: createManyLeaseInvoicesDto.map((val) => ({
							...val,
							organizationId,
						})),
					},
				},
			},
		});
		return updated.id;
	}
}
