import { ForbiddenError, subject } from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { Action } from 'src/casl/action.enum';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { searchBuilder } from 'src/search/search-builder';

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
		// search is only allowed for admins
		// TODO: Remove and rely on ability check?
		ForbiddenError.from(user.ability).throwUnlessCan(
			Action.Manage,
			subject('Organization', { id: organizationId }),
		);

		const take = 20;

		const [tenants, portfolios, properties] = await Promise.all([
			this.prisma.tenant.findMany({
				// FIX:add permissions to filter
				where: {
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
				take,
			}),
			this.prisma.portfolio.findMany({
				where: {
					// FIX:add permissions to filter
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
				take,
			}),
			this.prisma.property.findMany({
				// FIX:add permissions to filter
				where: {
					OR: [
						...searchBuilder('label', query),
						...searchBuilder('paci', query),
						...searchBuilder('area', query),
						...searchBuilder('street', query),
						// ...searchBuilder('portfolioId', query), // WARN: Remove? Inherited from old search
						// ...searchBuilder('address', query), // NOTE: Use client extensions to search in address?
					],
				},
				take,
			}),
		]);

		const hits = {
			tenants,
			portfolios,
			properties,
		};
		console.log(hits);

		const compat = {
			tenants: tenants.map((n) => ({
				...n,
				formatted: this.addFormattingToHit(n),
			})),
			portfolios: portfolios.map((n) => ({
				...n,
				formatted: this.addFormattingToHit(n),
			})),
			properties: properties.map((n) => ({
				...n,
				formatted: this.addFormattingToHit(n),
			})),
		};

		return compat;
	}

	// TODO: use
	wrapMatch(match: string, start: number, end: number) {
		const highlightPreTag = '<mark>';
		const highlightPostTag = '</mark>';

		const pre = match.slice(0, start);
		const matchStr = match.slice(start, end);
		const post = match.slice(end);

		return `${pre}${highlightPreTag}${matchStr}${highlightPostTag}${post}`;
	}

	// WARN: Fix
	addFormattingToHit(hit: Record<string, unknown>) {
		return {
			title: this.wrapMatch(
				title,
				Math.floor(Math.random() * title.length), // WARN: Fix
				title.length, // WARN: Fix
			),
		};
	}

	/**
	 * Given a string and a search query, determine if the string is a fuzzy match
	 */
	isMatch(str: string, query: string) {}
}
