<script context="module" lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const { page, take, q, orderBy, sortOrder } = parseParams(url);

		const leases = await stuff.api!.leases.findAll({
			page,
			take,
			q,
			orderBy,
			sortOrder,
		});

		return {
			props: { leases },
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let leases: Prop['leases'];

	// type Options = Props<typeof load>['options'];
	// export let options: Options;
	// let currentOptions = options;

	const sortOptions = [
		{ name: 'Created', value: 'createdAt' as const, active: true },
		{ name: 'Expiration', value: 'end' as const, active: false },
	];

	let filters = [
		{
			id: 'status',
			name: 'Status',
			options: [
				{ value: 'current', label: 'Current', checked: true },
				{ value: 'expired', label: 'Expired', checked: true },
				{ value: 'upcoming', label: 'Upcoming', checked: true },
			],
		},
	];
</script>

<Filter {filters} {sortOptions} />
<div class="">
	<LeaseList {leases} --border-radius-b="0" />
	<Pagination pagination={leases.pagination} />
</div>
