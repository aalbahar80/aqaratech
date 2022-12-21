import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Action } from 'src/casl/action.enum';
import { crumbs } from 'src/common/breadcrumb-select';
import { WithCount } from 'src/common/dto/paginated.dto';
import { QueryOptionsDto } from 'src/common/dto/query-options.dto';
import { IUser } from 'src/interfaces/user.interface';
import { CreatePayoutDto, PayoutDto } from 'src/payouts/dto/payout.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayoutsService {
	constructor(private readonly prisma: PrismaService) {}
	SubjectType = 'Payout' as const;

	async create({
		createPayoutDto,
		organizationId,
	}: {
		createPayoutDto: CreatePayoutDto;
		organizationId: string;
	}) {
		const created = await this.prisma.payout.create({
			data: {
				...createPayoutDto,
				organizationId,
			},
		});

		const payout = new PayoutDto(created);

		return payout;
	}

	async findAll({
		queryOptions,
		user,
		where,
	}: {
		queryOptions: QueryOptionsDto;
		user: IUser;
		where?: Prisma.PayoutWhereInput;
	}): Promise<WithCount<PayoutDto>> {
		const { skip, take, sort } = queryOptions;

		const filter: Prisma.PayoutWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).Payout,
				...(where ? [where] : []),
				queryOptions.filter,
			],
		};

		const [results, total] = await Promise.all([
			this.prisma.payout.findMany({
				take,
				skip,
				orderBy: sort,
				where: filter,
				include: { portfolio: crumbs.portfolio },
			}),
			this.prisma.payout.count({ where: filter }),
		]);

		return { total, results: results.map((p) => new PayoutDto(p)) };
	}

	async findOne({ id, user }: { id: string; user: IUser }) {
		const payout = await this.prisma.payout.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Read).Payout],
			},
			include: { portfolio: crumbs.portfolio },
		});

		return new PayoutDto(payout);
	}

	async remove({ id, user }: { id: string; user: IUser }) {
		await this.prisma.payout.findFirstOrThrow({
			where: {
				AND: [{ id }, accessibleBy(user.ability, Action.Delete).Payout],
			},
		});
		const deleted = await this.prisma.payout.delete({ where: { id } });
		return deleted.id;
	}
}
