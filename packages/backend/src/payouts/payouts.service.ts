import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Action } from 'src/casl/action.enum';
import { frisk } from 'src/casl/frisk';
import { crumbs } from 'src/common/breadcrumb-select';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { WithCount } from 'src/common/dto/paginated.dto';
import { IUser } from 'src/interfaces/user.interface';
import {
	CreatePayoutDto,
	PayoutDto,
	UpdatePayoutDto,
} from 'src/payouts/dto/payout.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayoutsService {
	constructor(private prisma: PrismaService) {}
	SubjectType = 'Payout' as const;

	async create({
		createPayoutDto,
		user,
	}: {
		createPayoutDto: CreatePayoutDto;
		user: IUser;
	}) {
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Create,
			subject(this.SubjectType, createPayoutDto),
		);

		const created = await this.prisma.payout.create({
			data: createPayoutDto,
		});
		const payout = new PayoutDto(created);

		return payout;
	}

	async findAll({
		pageOptionsDto,
		user,
		where,
	}: {
		pageOptionsDto: PageOptionsDto;
		user: IUser;
		where?: Prisma.PayoutWhereInput;
	}): Promise<WithCount<PayoutDto>> {
		const { page, take, orderBy, sortOrder } = pageOptionsDto;

		const filter: Prisma.PayoutWhereInput = {
			AND: [
				accessibleBy(user.ability, Action.Read).Payout,
				...(where ? [where] : []),
			],
		};

		const sort = orderBy
			? { [orderBy]: sortOrder }
			: { createdAt: 'desc' as Prisma.SortOrder };

		const [results, total] = await Promise.all([
			this.prisma.payout.findMany({
				take,
				skip: (page - 1) * take,
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
