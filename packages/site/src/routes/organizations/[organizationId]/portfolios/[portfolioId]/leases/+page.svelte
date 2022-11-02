<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/filter/FilterBar.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { ORDER_BY, SORT_ORDER } from '$lib/constants/pagination-keys';
	import { create } from '$lib/utils/route-helpers';
	import { getQuery, type UrlQuery } from '$lib/utils/set-query';
	import type { PageData } from './$types';

	enum Sort {
		Default = 'createdAt',
		Created = 'createdAt',
		Modified = 'updatedAt',
		Expiration = 'end',
	}

	$: sort = {
		id: 'sort',
		label: 'Sort',
		options: [
			{
				label: 'Default',
				value: Sort.Default,
				action: () => setQuery({ title: ORDER_BY, value: null }),
				active: null === $page.url.searchParams.get(ORDER_BY),
			},
			{
				label: 'Created',
				value: Sort.Created,
				action: () => setQuery({ title: ORDER_BY, value: Sort.Created }),
				active: Sort.Created === $page.url.searchParams.get(ORDER_BY),
			},
			{
				label: 'Modified',
				value: Sort.Modified,
				action: () => setQuery({ title: ORDER_BY, value: Sort.Modified }),
				active: Sort.Modified === $page.url.searchParams.get(ORDER_BY),
			},
			{
				label: 'Expiration',
				value: Sort.Expiration,
				action: () =>
					setQuery(
						{ title: ORDER_BY, value: Sort.Expiration },
						{ title: SORT_ORDER, value: 'asc' },
					),
				active: Sort.Expiration === $page.url.searchParams.get(ORDER_BY),
			},
		],
	};

	enum Status {
		All = 'all',
		Current = 'current',
		Expired = 'expired',
		Upcoming = 'upcoming',
	}

	let currentStatus: Status;
	$: status = {
		id: Status.All,
		label: 'Status',
		options: [
			{
				value: Status.All,
				label: 'All',
				active: currentStatus === Status.All,
				action: () => {
					currentStatus = Status.All;
					setQuery({ title: 'filter', value: null });
				},
			},
			{
				value: Status.Current,
				label: 'Current',
				active: currentStatus === Status.Current,
				action: () => {
					currentStatus = Status.Current;
					setQuery({ title: 'filter', value: { end: { gte: today() } } });
				},
			},
			{
				value: Status.Expired,
				label: 'Expired',
				active: currentStatus === Status.Expired,
				action: () => {
					currentStatus = Status.Expired;
					setQuery({ title: 'filter', value: { end: { lt: today() } } });
				},
			},
			{
				value: Status.Upcoming,
				label: 'Upcoming',
				active: currentStatus === Status.Upcoming,
				action: () => {
					currentStatus = Status.Upcoming;
					setQuery({ title: 'filter', value: { start: { gt: today() } } });
				},
			},
		],
	};

	const today = () => {
		const now = new Date().toISOString().split('T')[0];
		return `${now}T00:00:00.000Z`;
	};

	const setQuery = (...queries: UrlQuery[]) => {
		const url = getQuery({
			url: $page.url,
			queries: [...queries, { title: 'p', value: null }],
		});
		goto(url, { noscroll: true });
	};

	export let data: PageData;
</script>

<FilterBar persistent={[sort, status]} />

<div class="">
	<LeaseList
		leases={data.leases}
		formUrl={create({ entity: 'lease' })}
		--border-radius-b="0"
	/>
</div>
