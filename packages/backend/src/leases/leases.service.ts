import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
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
		// TODO: consider returning a lease dto class
		return this.prisma.lease.create({
			data: {
				...createLeaseDto,
				organizationId,
			},
		});
	}

	async findAll({
		pageOptionsDto,
		user,
		where,
	}: {
		pageOptionsDto: PageOptionsDto;
		user: IUser;
		where?: Prisma.LeaseWhereInput;
	}): Promise<WithCount<LeaseDto>> {
		const { page, take, filter: qfilter } = pageOptionsDto;

		const filter: Prisma.LeaseWhereInput = {
			AND: [accessibleBy(user.ability).Lease, ...(where ? [where] : [])],
			...qfilter,
		};

		const orderBy = pageOptionsDto.orderBy
			? { [pageOptionsDto.orderBy]: pageOptionsDto.sortOrder }
			: { createdAt: 'desc' as Prisma.SortOrder };

		const [data, total] = await Promise.all([
			this.prisma.lease.findMany({
				take,
				skip: (page - 1) * take,
				where: filter,
				orderBy,
				include: {
					tenant: crumbs.tenant,
					unit: crumbs.unit,
				},
			}),
			this.prisma.lease.count({ where: filter }),
		]);

		return { total, results: data.map((l) => new LeaseDto(l)) };
	}

	async findOne({ id }: { id: string }) {
		const data = await this.prisma.lease.findUniqueOrThrow({
			where: { id },
			include: {
				tenant: crumbs.tenant,
				unit: crumbs.unit,
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
		return this.prisma.lease.update({
			where: { id, AND: accessibleBy(user.ability, Action.Update).Lease },
			data: updateLeaseDto,
		});
	}

	async remove({ id }: { id: string }) {
		const deleted = await this.prisma.lease.delete({ where: { id } });
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
		const updated = await this.prisma.lease.update({
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
