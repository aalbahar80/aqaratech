<script lang="ts" context="module">
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import Filter from '$lib/components/Filter.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import type { Load } from './index';

	export const load: Load = async ({ url }) => {
		const pageIndex = url.searchParams.get('p');
		const defaultOptions = {
			pageIndex: 1,
			size: 10,
			sortBy: { key: 'createdAt', order: 'desc' } as const,
			status: {
				current: true,
				upcoming: true,
				expired: true,
			},
		};
		const [total, { data, pagination }] = await Promise.all([
			trpc.query(`leases:count`),
			trpc.query(`leases:list`, defaultOptions),
		]);
		return {
			props: { total, pagination, leases: data },
		};
	};
</script>

<script lang="ts">
	export let leases: InferQueryOutput<`leases:list`>[`data`];

	const sortOptions = [{ name: 'Created' }, { name: 'Expiration' }];
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
	interface StatusFilters {
		value: string;
		checked: boolean;
	}
	const handleFilter = async (newFilters: StatusFilters[] | undefined) => {
		leases = await trpc
			.query(`leases:list`, {
				pageIndex: 1,
				status: {
					current: newFilters?.find((o) => o.value === 'current')?.checked,
					expired: newFilters?.find((o) => o.value === 'expired')?.checked,
					upcoming: newFilters?.find((o) => o.value === 'upcoming')?.checked,
				},
			})
			.then((res) => res.data);
	};
	$: handleFilter(filters[0]?.options);
</script>

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Filter bind:filters {sortOptions} />
	<LeaseList {leases} />
</div>
