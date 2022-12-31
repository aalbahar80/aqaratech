import { ForbiddenError, subject } from '@casl/ability';
import { accessibleBy } from '@casl/prisma';
import { Injectable } from '@nestjs/common';

import { computeLabelProperty } from '@self/utils';

import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { fuzzyMatch } from 'src/search/fuzzy/fuzzy-match';
import { searchBuilder } from 'src/search/search-builder';

import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
	constructor(private readonly prisma: PrismaService) {}

	async search({
		query,
		organizationId,
		user,
	}: {
		query: string;
		organizationId: string;
		user: IUser;
	}) {
		// TODO: Remove to unlock search for non-admins
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Manage,
			subject('Organization', { id: organizationId }),
		);

		const take = 20;

		const [tenants, portfolios, properties] = await Promise.all([
			this.prisma.tenant.findMany({
				where: {
					AND: [
						accessibleBy(user.ability, Action.Read).Tenant,
						{
							OR: [
								...searchBuilder('fullName', query),
								...searchBuilder('label', query),
								...searchBuilder('phone', query),
								...searchBuilder('civilid', query),
								...searchBuilder('passportNum', query),
								...searchBuilder('residencyNum', query),
								// email
								// prettier-ignore
								{ roles: { some: { user: { OR: searchBuilder('email', query) } } } },
							],
						},
					],
				},
				take,
			}),
			this.prisma.portfolio.findMany({
				where: {
					AND: [
						accessibleBy(user.ability, Action.Read).Portfolio,
						{
							OR: [
								...searchBuilder('fullName', query),
								...searchBuilder('phone', query),
								...searchBuilder('label', query),
								...searchBuilder('civilid', query),
								// email
								// prettier-ignore
								{ roles: { some: { user: { OR: searchBuilder('email', query) } } } },
							],
						},
					],
				},
				take,
			}),
			this.prisma.property.findMany({
				where: {
					AND: [
						accessibleBy(user.ability, Action.Read).Property,
						{
							OR: [
								...searchBuilder('label', query),
								...searchBuilder('paci', query),
								...searchBuilder('area', query),
								...searchBuilder('street', query),
								// ...searchBuilder('portfolioId', query), // WARN: Remove? Inherited from old search
								// ...searchBuilder('address', query), // NOTE: Use client extensions to search in address?
							],
						},
					],
				},
				take,
			}),
		]);

		const hits = {
			tenant: fuzzyMatch(query, tenants).map((n) => ({
				...n,
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				title: n.label || n.fullName,
				entity: 'tenant',
			})),

			portfolio: fuzzyMatch(query, portfolios).map((n) => ({
				...n,
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				title: n.label || n.fullName,
				entity: 'portfolio',
			})),

			property: fuzzyMatch(query, properties).map((n) => ({
				...n,
				// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
				title: n.label || computeLabelProperty(n),
				entity: 'property',
			})),
		} satisfies SearchDto;

		return hits;
	}
}
