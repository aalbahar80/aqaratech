<script context="module" lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Filter from '$lib/components/Filter.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const { page, take, q, orderBy, sortOrder, filter } = parseParams(url);

		console.log({ filter }, 'index.svelte ~ 14');
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
		{ name: 'Created', value: 'createdAt' as const },
		{ name: 'Expiration', value: 'end' as const },
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
					action: () => onFilter({ end: { gte: new Date() } }),
				},
				{
					value: 'expired',
					label: 'Expired',
					checked: true,
					action: () => onFilter({ end: { lt: new Date() } }),
				},
				{
					value: 'upcoming',
					label: 'Upcoming',
					checked: true,
					action: () => onFilter({ start: { gt: new Date() } }),
				},
			],
		},
	];

	const onFilter = (filter: any) => {
		const url = new URL($page.url);
		url.searchParams.set('filter', JSON.stringify(filter));
		goto(url);
	};
</script>

<Filter {filters} {sortOptions} />
<div class="">
	<LeaseList {leases} --border-radius-b="0" />
	<Pagination pagination={leases.pagination} />
</div>
