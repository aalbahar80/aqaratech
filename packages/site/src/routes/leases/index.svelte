<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const { page, take, q, orderBy, sortOrder, filter } = parseParams(url);

		const leases = await stuff.api!.leases.findAll({
			page,
			take,
			q,
			//@ts-ignore
			orderBy,
			sortOrder,
			filter,
		});

		return {
			props: { leases },
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let leases: Prop['leases'];

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
				action: () => setQuery({ title: 'orderBy', value: null }),
				active: null === $page.url.searchParams.get('orderBy'),
			},
			{
				label: 'Created',
				value: Sort.Created,
				action: () => setQuery({ title: 'orderBy', value: Sort.Created }),
				active: Sort.Created === $page.url.searchParams.get('orderBy'),
			},
			{
				label: 'Modified',
				value: Sort.Modified,
				action: () => setQuery({ title: 'orderBy', value: Sort.Modified }),
				active: Sort.Modified === $page.url.searchParams.get('orderBy'),
			},
			{
				label: 'Expiration',
				value: Sort.Expiration,
				action: () => setQuery({ title: 'orderBy', value: Sort.Expiration }),
				active: Sort.Expiration === $page.url.searchParams.get('orderBy'),
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

	interface UrlQuery {
		title: string;
		value: any;
	}

	const setQuery = (...queries: UrlQuery[]) => {
		const url = new URL($page.url);

		for (let { title, value } of queries) {
			if (!value) {
				url.searchParams.delete(title);
				goto(url);
				return;
			}

			if (typeof value !== 'string') {
				value = JSON.stringify(value);
			}

			url.searchParams.set(title, value);
		}

		url.searchParams.sort(); // good for caching
		goto(url);
	};
</script>

<FilterBar persistent={[sort, status]} />

<div class="">
	<LeaseList {leases} --border-radius-b="0" />
	<Pagination pagination={leases.pagination} />
</div>
