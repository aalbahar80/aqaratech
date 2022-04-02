<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { getAddress } from '$lib/definitions/property';
	import { getName, getProgress } from '$lib/utils/common';
	import { Calendar, Home, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { formatDistance } from 'date-fns';

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
	export let lease: Lease;
	export let index: number | undefined = undefined;

	const expired = lease.end < new Date();
</script>

<a href={`/leases/${lease.id}`} class="block hover:bg-gray-50">
	<div class="px-4 py-4 sm:px-6">
		<div class="flex flex-row-reverse items-center justify-between">
			<div class="ml-2 flex flex-shrink-0">
				<p
					class={'inline-flex rounded-full px-2 text-xs font-semibold leading-5'}
					class:badge-green={!expired}
					class:badge-red={expired}
				>
					{expired ? 'Expired' : 'Active'}
				</p>
			</div>
			{#if index}
				<p class="truncate text-sm font-medium text-indigo-600">
					# {index}
				</p>
			{/if}
		</div>
		<div class="mt-2 sm:flex sm:justify-between">
			<!-- Tenant/Unit Icons -->
			<div class="flex flex-col gap-2">
				{#if 'tenant' in lease}
					<p class="flex items-center text-sm text-gray-500">
						<Icon
							src={User}
							theme="solid"
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
							aria-hidden="true"
						/>
						{getName(lease.tenant)}
					</p>
				{/if}
				{#if 'unit' in lease}
					<p class="flex items-center text-sm text-gray-500">
						<Icon
							src={Home}
							class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
							aria-hidden="true"
						/>
						{getAddress(lease.unit.property)}
					</p>
				{/if}
			</div>

			<!-- Calendar Icon -->
			<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
				<Icon
					src={Calendar}
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				<p>
					Expiry: <time dateTime={lease.end.toISOString()}
						>{formatDistance(lease.end, new Date(), {
							addSuffix: true,
						})}</time
					>
				</p>
			</div>
		</div>
		{#if !expired}
			<div class="mt-4 overflow-hidden rounded-full bg-gray-200">
				<div
					class="h-1 rounded-full bg-indigo-600"
					style:width={`${getProgress(lease.start, lease.end)}%`}
				/>
			</div>
		{/if}
	</div>
</a>

<style lang="postcss">
	.badge-green {
		@apply bg-green-100 text-green-800;
	}
	.badge-red {
		@apply bg-red-100 text-red-800;
	}
</style>
