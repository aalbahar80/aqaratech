<script lang="ts">
	import LeaseCard from '$lib/components/lease/LeaseCard.svelte';
	import { FolderAdd, Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	interface Lease {
		id: string;
		tenant?: {
			id: string;
			firstName: string;
			lastName: string;
		};
		unit?: {
			id: string;
			unitNumber: string;
			property: {
				area: string | null;
				block: string | null;
				street: string | null;
				number: string | null;
			};
		};
		start: Date;
		end: Date;
	}
	export let leases: Lease[];
	export let newHref = '/new/leases';
	export let showIndex = false;
</script>

<section class="overflow-hidden rounded-md bg-white shadow">
	{#if leases.length}
		<!-- Section Heading -->
		<div class="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
			<div
				class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
			>
				<div class="ml-4 mt-2">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Leases</h3>
				</div>
				<div class="ml-4 mt-2 flex-shrink-0">
					<a
						href={newHref}
						class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Create new lease
					</a>
				</div>
			</div>
		</div>

		<ul class="divide-y divide-gray-200">
			{#each leases as lease, index (lease.id)}
				<li in:fade|local={{ duration: 200 }} animate:flip={{ duration: 200 }}>
					<LeaseCard {lease} index={showIndex ? index + 1 : undefined} />
				</li>
			{/each}
		</ul>
	{:else}
		<!-- Empty State -->
		<div class="text-center py-8 sm:py-16">
			<Icon
				src={FolderAdd}
				class="mx-auto h-12 w-12 text-gray-400"
				aria-hidden="true"
			/>
			<h3 class="mt-2 text-sm font-medium text-gray-900">No leases</h3>
			<p class="mt-1 text-sm text-gray-500">
				Get started by creating a new lease.
			</p>
			<div class="mt-6">
				<a
					href={newHref}
					class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<Icon src={Plus} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
					New Lease
				</a>
			</div>
		</div>
	{/if}
</section>

<style>
	section {
		border-bottom-right-radius: var(--border-radius-b, 0.375rem);
		border-bottom-left-radius: var(--border-radius-b, 0.375rem);
	}
</style>
