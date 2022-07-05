<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FilterBar from '$lib/components/FilterBar.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';
	import type { Filter } from '$lib/models/interfaces/filter.interface';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const { page, take, q, orderBy, sortOrder, filter } = parseParams(url);

		const leases = await stuff.api!.leases.findAll({
			page,
			take,
			q,
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

	let status: Filter = {
		id: 'status',
		label: 'Status',
		options: [
			{
				value: 'current',
				label: 'Current',
				active: true,
				action: () => setQuery('filter', { end: { gte: new Date() } }),
			},
			{
				value: 'expired',
				label: 'Expired',
				active: true,
				action: () => setQuery('filter', { end: { lt: new Date() } }),
			},
			{
				value: 'upcoming',
				label: 'Upcoming',
				active: true, // TODO handle with headlessui
				action: () => setQuery('filter', { start: { gt: new Date() } }),
			},
		],
	};

	const setQuery = (title: string, value: any) => {
		if (typeof value !== 'string') {
			value = JSON.stringify(value);
		}
		const url = new URL($page.url);
		url.searchParams.set(title, value);
		url.searchParams.sort(); // good for caching
		goto(url);
	};
</script>

<FilterBar responsive={[status]} persistent={[sort, status]} />

<div class="">
	<LeaseList {leases} --border-radius-b="0" />
	<Pagination pagination={leases.pagination} />
</div>
