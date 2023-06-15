import * as R from 'remeda';

import type { LayoutLoad } from './$types';
import { get } from 'svelte/store';

import { createApi } from '$api';
import { FilterEnum } from '$lib/stores/filter/Filter.enum';
import { isPaid } from '$lib/stores/filter/is-paid';
import { isPaidOnline } from '$lib/stores/filter/is-paid-online';
import { payPhase } from '$lib/stores/filter/pay-phase';
import { property } from '$lib/stores/filter/property';
import { range, rangeKind } from '$lib/stores/filter/range';
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
	const rangeKindFilter = get(rangeKind);
	const propertyId = get(property);
	const unitId = get(unit);
	const isPaidFilter = get(isPaid);
	const isPaidOnlineFilter = get(isPaidOnline);
	const payPhaseFilter = get(payPhase);

	depends(
		FilterEnum.Range,
		FilterEnum.RangeKind,
		FilterEnum.Property,
		FilterEnum.Unit,
		FilterEnum.IsPaid,
		FilterEnum.IsPaidOnline,
		FilterEnum.PayPhase,
	);

	// If we use filter from the URL, we need to make an update here to avoid
	// overriding the start/end when spreading the searchParams.
	const queryFilter = searchParams.get('filter');

	if (queryFilter) {
		throw new Error('Not implemented');
	}

	const { organizationId, portfolioId } = params;

	const filter: Record<string, unknown> = {
		[rangeKindFilter]: { gte: new Date(start), lte: new Date(end) },
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
		api.organizations.getIncomeByMonth({
			organizationId,
			portfolioId,
			propertyId: propertyId === null ? undefined : propertyId,
			unitId: unitId === null ? undefined : unitId,
			start,
			end,
			rangeKind: rangeKindFilter,
		}),
		api.portfolios.findAllLeaseInvoices({
			id: params.portfolioId,
			filter,
			filterCustom: {
				payPhase: payPhaseFilter,
			},
			...parseParams(searchParams),
		}),
	]);

	/** Summed income data, used by multiple components. */
	const sumIncome = {
		total: invoices.sum ?? 0,
		paid: R.pipe(
			invoices.aggregate,
			R.filter((x) => x.isPaid),
			R.sumBy((x) => x.sum.amount ?? 0),
		),
		unpaid: R.pipe(
			invoices.aggregate,
			R.filter((x) => !x.isPaid),
			R.sumBy((x) => x.sum.amount ?? 0),
		),
	};

	return {
		income,
		sumIncome,
		invoices,
	};
};
