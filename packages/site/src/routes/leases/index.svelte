<script context="module" lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import Pagination from '$lib/components/table/Pagination.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url, stuff }: LoadEvent) => {
		const { page, take, q } = parseParams(url);
		const leases = await stuff.api!.leases.findAll({ page, take, q });

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
		{ name: 'Created', value: 'createdAt' as const },
		{ name: 'Expiration', value: 'end' as const },
	];
	let currentSort = sortOptions[0]!.value;

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

	// const handleFilter = async (newOptions: typeof options) => {
	// 	if (compare(newOptions, currentOptions)) {
	// 		return; // no change
	// 	}
	// 	currentOptions = newOptions;
	// 	({ data: leases, pagination } = $session.authz?.isOwner
	// 		? await trpc().query('owner:leases:list', {
	// 				...newOptions,
	// 				portfolioId: $session.authz.id,
	// 		  })
	// 		: await trpc().query('leases:list', newOptions));
	// };

	// changes to options will trigger a new query
	// $: options = {
	// 	...options,
	// 	sortBy: { key: currentSort, order: 'desc' },
	// 	status: {
	// 		current: filters[0]?.options[0]?.checked,
	// 		expired: filters[0]?.options[1]?.checked,
	// 		upcoming: filters[0]?.options[2]?.checked,
	// 	},
	// };
	// $: handleFilter(options);
</script>

<Filter bind:filters bind:currentSort {sortOptions} />
<div class="">
	<LeaseList {leases} --border-radius-b="0" />
	<Pagination pagination={leases.pagination} />
</div>
