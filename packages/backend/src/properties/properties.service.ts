import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { CreatedDto, UpdatedDto } from 'src/common/dto/abstract.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import {
	CreatePropertyDto,
	PropertyDto,
	UpdatePropertyDto,
} from 'src/properties/dto/property.dto';

@Injectable()
export class PropertiesService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Property' as const;

	async create({
		createPropertyDto,
		organizationId,
	}: {
		createPropertyDto: CreatePropertyDto;
		organizationId: string;
	}) {
		const created = await this.prisma.c.property.create({
			data: {
				...createPropertyDto,
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
		where?: Prisma.PropertyWhereInput;
	}): Promise<WithCount<PropertyDto>> {
		const { take, skip, sort } = queryOptions;

		const filter: Prisma.PropertyWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).Property,
				...(where ? [where] : []),
			],
		};

		const [results, total] = await Promise.all([
			this.prisma.c.property.findMany({
				take,
				skip,
				orderBy: sort,
				where: filter,
				include: { portfolio: crumbs.portfolio },
			}),
			this.prisma.c.property.count({ where: filter }),
		]);

		return { total, results: results.map((p) => new PropertyDto(p)) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const property = await this.prisma.c.property.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).Property],
			},
			include: { portfolio: crumbs.portfolio },
		});

		return new PropertyDto(property);
	}

	async update({
		id,
		updatePropertyDto,
		user,
	}: {
		id: string;
		updatePropertyDto: UpdatePropertyDto;
		user: IUser;
	}) {
		const updated = await this.prisma.c.property.update({
			where: { id, AND: accessibleBy(user.ability, Action.Update).Property },
			data: updatePropertyDto,
		});

		return new UpdatedDto(updated);
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		return await this.prisma.c.property.delete({
			where: { id, AND: accessibleBy(user.ability, Action.Delete).Property },
		});
	}
}
