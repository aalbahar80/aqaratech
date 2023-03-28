import * as R from 'remeda';

import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { isPaidLate } from '$lib/stores/filter/is-paid-late';
import { isPaidOnline } from '$lib/stores/filter/is-paid-online';
import { property } from '$lib/stores/filter/property';
import { range } from '$lib/stores/filter/range';
import { unit } from '$lib/stores/filter/unit';
import { parseParams } from '$lib/utils/parse-params';

export const load: LayoutLoad = async ({
	fetch,
	params,
	depends,
	url: { searchParams },
}) => {
	// Filter options
	const { start, end } = get(range);
	const propertyId = get(property);
	const unitId = get(unit);
	const isPaidFilter = get(isPaid);
	const isPaidOnlineFilter = get(isPaidOnline);
	const isPaidLateFilter = get(isPaidLate);

	depends(
		FilterEnum.Range,
		FilterEnum.Property,
		FilterEnum.Unit,
		FilterEnum.IsPaid,
		FilterEnum.IsPaidOnline,
		FilterEnum.IsPaidLate,
	);

	// If we use filter from the URL, we need to make an update here to avoid
	// overriding the start/end when spreading the searchParams.
	const queryFilter = searchParams.get('filter');

	if (queryFilter) {
		throw new Error('Not implemented');
	}

	const { organizationId, portfolioId } = params;

	const filter: Record<string, unknown> = {
		postAt: { gte: new Date(start), lte: new Date(end) },
		isPaid: isPaidFilter,
		mfPaymentId:
			isPaidOnlineFilter === true
				? { not: null }
				: isPaidOnlineFilter === false
				? { equals: null }
				: undefined,
	};

	// Only include propertyId & unitId if they're not null, otherwise we might
	// send a literal "undefined"

	if (propertyId) {
		filter['lease'] = { unit: { propertyId } };
	}

	if (unitId) {
		filter['lease'] = { unitId };
	}

	const api = createApi(fetch);

	const [income, invoices] = await Promise.all([
		api.portfolios.getIncomeByMonth({
			organizationId,
			portfolioId,
			propertyId: propertyId === null ? undefined : propertyId,
			unitId: unitId === null ? undefined : unitId,
			start,
			end,
		}),
		api.portfolios.findAllLeaseInvoices({
			id: params.portfolioId,
			filter,
			filterCustom: {
				isPaidLate: isPaidLateFilter,
			},
			...parseParams(searchParams),
		}),
	]);

	/**
	 * Summed income data, used by multiple components.
	 */
	const sumIncome = {
		total: R.sumBy(income.total, (x) => x.amount),
		paid: R.sumBy(income.paid, (x) => x.amount),
		unpaid: R.sumBy(income.unpaid, (x) => x.amount),
	};

	return {
		income,
		sumIncome,
		invoices,
	};
};
