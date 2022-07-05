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

	const sortOptions = [
		{
			name: 'Created',
			value: 'createdAt' as const,
			action: () => setQuery('orderBy', 'createdAt'),
		},
		{
			name: 'Expiration',
			value: 'end' as const,
			action: () => setQuery('orderBy', 'end'),
		},
	];

	let filters = [
		{
			id: 'status',
			name: 'Status',
			options: [
				{
					value: 'current',
					label: 'Current',
					checked: true,
					action: () => setQuery('filter', { end: { gte: new Date() } }),
				},
				{
					value: 'expired',
					label: 'Expired',
					checked: true,
					action: () => setQuery('filter', { end: { lt: new Date() } }),
				},
				{
					value: 'upcoming',
					label: 'Upcoming',
					checked: true,
					action: () => setQuery('filter', { start: { gt: new Date() } }),
				},
			],
		},
	];

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

<FilterBar {filters} {sortOptions} />
<div class="">
	<LeaseList {leases} --border-radius-b="0" />
	<Pagination pagination={leases.pagination} />
</div>
