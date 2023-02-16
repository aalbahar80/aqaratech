import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';

import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	CreateTenantDto,
	TenantDto,
	UpdateTenantDto,
} from 'src/tenants/dto/tenant.dto';

@Injectable()
export class TenantsService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Tenant' as const;
	IndexName = 'tenant' as const;

	async create({
		createTenantDto,
		organizationId,
	}: {
		createTenantDto: CreateTenantDto;
		organizationId: string;
	}) {
		const tenant = await this.prisma.c.tenant.create({
			data: {
				...createTenantDto,
				organizationId,
			},
		});

		return tenant;
	}

	async findAll({
		queryOptions,
		user,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
	}): Promise<WithCount<TenantDto>> {
		const { skip, take, sort, filter } = queryOptions;

		const where: Prisma.TenantWhereInput = {
			AND: [accessibleBy(user.ability, Action.Read).Tenant, filter],
		};

		const [results, total] = await Promise.all([
			this.prisma.c.tenant.findMany({
				take,
				skip,
				orderBy: sort,
				where,
			}),
			this.prisma.c.tenant.count({
				where,
			}),
		]);

		return { total, results: plainToInstance(TenantDto, results) };
	}

	async findOne({ id }: { id: string }) {
		const data = await this.prisma.c.tenant.findUniqueOrThrow({
			where: { id },
		});

		return plainToInstance(TenantDto, data);
	}

	async update({
		id,
		updateTenantDto,
		user,
	}: {
		id: string;
		updateTenantDto: UpdateTenantDto;
		user: IUser;
	}) {
		const tenant = await this.prisma.c.tenant.update({
			where: {
				id,
				// TODO double check this
				AND: [accessibleBy(user.ability, Action.Update).Tenant],
			},
			data: updateTenantDto,
		});

		return plainToInstance(TenantDto, tenant);
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		await this.prisma.c.tenant.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).Tenant],
			},
		});

		// PERF: Can be optimized after Meilisearch removal
		const deleted = await this.prisma.c.tenant.delete({ where: { id } });

		return plainToInstance(TenantDto, deleted);
	}
}
