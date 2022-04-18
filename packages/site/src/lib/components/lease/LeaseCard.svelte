<script lang="ts">
	import Badge from '$components/Badge.svelte';
	import { getAddress, getName, getProgress } from '$lib/utils/common';
	import { getBadge } from '$models/interfaces/lease.interface';
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
	export let hrefBase = '';

	const expired = lease.end < new Date();

	const badge = getBadge(lease);
	const progress = getProgress(lease.start, lease.end);
</script>

<a href={`${hrefBase}/leases/${lease.id}`} class="block hover:bg-gray-50">
	<div class="px-4 py-4 sm:px-6">
		<div class="flex flex-row-reverse items-center justify-between">
			<div class="ml-2 flex flex-shrink-0">
				<Badge label={badge.label} badgeColor={badge.color} />
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
			<div
				class="mt-4 animate-pulse overflow-hidden rounded-full bg-gray-200"
				class:animate-pulse={progress === 0}
			>
				<div
					class="h-1 rounded-full bg-indigo-600"
					style:width={`${progress}%`}
				/>
			</div>
		{/if}
	</div>
</a>
