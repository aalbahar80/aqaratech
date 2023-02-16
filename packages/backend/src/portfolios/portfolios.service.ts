import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Action } from 'src/casl/action.enum';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import {
	CreatePortfolioDto,
	PortfolioDto,
	UpdatePortfolioDto,
} from 'src/portfolios/dto/portfolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PortfoliosService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Portfolio' as const;
	IndexName = 'portfolio' as const; // TODO: Remove?

	async create({
		createPortfolioDto,
		organizationId,
	}: {
		createPortfolioDto: CreatePortfolioDto;
		organizationId: string;
	}) {
		const portfolio = await this.prisma.c.portfolio.create({
			data: {
				...createPortfolioDto,
				organizationId,
			},
		});

		return plainToInstance(PortfolioDto, portfolio);
	}

	async findAll({
		queryOptions,
		user,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
	}): Promise<WithCount<PortfolioDto>> {
		const { skip, take, sort } = queryOptions;

		const [results, total] = await Promise.all([
			this.prisma.c.portfolio.findMany({
				take,
				skip,
				orderBy: sort,
				where: accessibleBy(user.ability, Action.Read).Portfolio,
			}),
			this.prisma.c.portfolio.count({
				where: accessibleBy(user.ability, Action.Read).Portfolio,
			}),
		]);

		return { total, results: plainToInstance(PortfolioDto, results) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const data = await this.prisma.c.portfolio.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).Portfolio],
			},
		});

		return plainToInstance(PortfolioDto, data);
	}

	async update({
		id,
		updatePortfolioDto,
		user,
	}: {
		id: string;
		updatePortfolioDto: UpdatePortfolioDto;
		user: IUser;
	}) {
		const portfolio = await this.prisma.c.portfolio.update({
			where: { id, AND: accessibleBy(user.ability, Action.Update).Portfolio },
			data: updatePortfolioDto,
		});

		return plainToInstance(PortfolioDto, portfolio);
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		await this.prisma.c.portfolio.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).Portfolio],
			},
		});

		// PERF: Can be optimized after Meilisearch removal
		const portfolio = await this.prisma.c.portfolio.delete({ where: { id } });

		return plainToInstance(PortfolioDto, portfolio);
	}
}
