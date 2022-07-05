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

	$: sort = {
		id: 'sort',
		label: 'Sort',
		options: [
			{
				label: 'Created',
				value: 'createdAt',
				action: () => setQuery('orderBy', 'createdAt'),
				active: 'createdAt' === $page.url.searchParams.get('orderBy'),
			},
			{
				label: 'Expiration',
				value: 'end',
				action: () => setQuery('orderBy', 'end'),
				active: 'end' === $page.url.searchParams.get('orderBy'),
			},
		],
	};

	let currentStatus: string | undefined = 'all';
	$: status = {
		id: 'status',
		label: 'Status',
		options: [
			{
				value: 'all',
				label: 'All',
				active: currentStatus === 'all',
				action: () => {
					currentStatus = 'all';
					setQuery('filter', null);
				},
			},
			{
				value: 'current',
				label: 'Current',
				active: currentStatus === 'current',
				action: () => {
					currentStatus = 'current';
					setQuery('filter', { end: { gte: new Date() } });
				},
			},
			{
				value: 'expired',
				label: 'Expired',
				active: currentStatus === 'expired',
				action: () => {
					currentStatus = 'expired';
					setQuery('filter', { end: { lt: new Date() } });
				},
			},
			{
				value: 'upcoming',
				label: 'Upcoming',
				active: currentStatus === 'upcoming',
				action: () => {
					currentStatus = 'upcoming';
					setQuery('filter', { start: { gt: new Date() } });
				},
			},
		],
	};

	const setQuery = (title: string, value: any) => {
		const url = new URL($page.url);

		if (!value) {
			url.searchParams.delete(title);
			goto(url);
			return;
		}

		if (typeof value !== 'string') {
			value = JSON.stringify(value);
		}

		url.searchParams.set(title, value);
		url.searchParams.sort(); // good for caching
		goto(url);
	};
</script>

<FilterBar persistent={[sort, status]} />

<div class="">
	<LeaseList {leases} --border-radius-b="0" />
	<Pagination pagination={leases.pagination} />
</div>
