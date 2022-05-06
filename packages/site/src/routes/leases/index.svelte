<script lang="ts" context="module">
	import { session } from '$app/stores';
	import { trpc, type InferQueryInput } from '$lib/client/trpc';
	import Filter from '$lib/components/Filter.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import type { Props } from '$lib/models/types/Props.type';
	import type { LoadInput } from '@sveltejs/kit';
	import { isEqual } from 'lodash-es';

	export const load = async ({ session }: LoadInput) => {
		type Options = Partial<InferQueryInput<'owner:leases:list'>>;
		const options: Options = {
			pageIndex: 1,
			size: 15,
			sortBy: { key: 'createdAt', order: 'desc' } as const,
			status: {
				current: true,
				upcoming: true,
				expired: true,
			},
		};

		const { data, pagination } = session.authz?.isOwner
			? await trpc().query('owner:leases:list', {
					...options,
					clientId: session.authz.id,
			  })
			: await trpc().query('leases:list', options);

		return {
			props: { pagination, leases: data, options },
		};
	};
</script>

<script lang="ts">
	type Leases = Props<typeof load>['leases'];
	type Pagination = Props<typeof load>['pagination'];
	type Options = Props<typeof load>['options'];
	export let leases: Leases;
	export let pagination: Pagination;
	export let options: Options;

	let currentOptions = options;

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

	const handleFilter = async (newOptions: typeof options) => {
		if (isEqual(newOptions, currentOptions)) {
			return; // no change
		}
		currentOptions = newOptions;
		({ data: leases, pagination } = $session.authz?.isOwner
			? await trpc().query('owner:leases:list', {
					...newOptions,
					clientId: $session.authz.id,
			  })
			: await trpc().query('leases:list', newOptions));
	};

	// changes to options will trigger a new query
	$: options = {
		...options,
		sortBy: { key: currentSort, order: 'desc' },
		status: {
			current: filters[0]?.options[0]?.checked,
			expired: filters[0]?.options[1]?.checked,
			upcoming: filters[0]?.options[2]?.checked,
		},
	};
	$: handleFilter(options);
</script>

<Filter bind:filters bind:currentSort {sortOptions} />
<div class="">
	<LeaseList {leases} --border-radius-b="0" />

	<nav
		class="flex items-center justify-between rounded-lg rounded-t-none border-t border-gray-200 bg-white px-4 py-3 shadow sm:px-6"
		aria-label="Pagination"
	>
		<div class="hidden sm:block">
			<p class="text-sm text-gray-700">
				Showing <span class="font-medium">{pagination.start}</span> to
				<span class="font-medium">{pagination.start + leases.length - 1}</span>
				of{' '}
				<span class="font-medium">{pagination.total}</span> results
			</p>
		</div>
		<div class="flex flex-1 justify-between sm:justify-end">
			<button
				class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				disabled={!pagination.hasPreviousPage}
				on:click={() => {
					options = {
						...options,
						pageIndex: Math.max(pagination.pageIndex - 1, 1),
					};
				}}
				rel="prev"
			>
				Previous
			</button>
			<button
				class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				disabled={!pagination.hasNextPage}
				rel="next"
				on:click={() => {
					options = {
						...options,
						pageIndex: pagination.pageIndex + 1,
					};
				}}
			>
				Next
			</button>
		</div>
	</nav>
</div>

<style lang="postcss">
	nav button:disabled {
		@apply cursor-not-allowed opacity-50;
	}
</style>
