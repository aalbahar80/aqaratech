<script lang="ts">
	import type { TenantBrowse } from '$lib/definitions/select';
	import { formatDateDiff, getProgress } from '$lib/utils/date-utils';
	import { Calendar, Home, Plus } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Jsonify } from 'type-fest';

	export let leases: Jsonify<TenantBrowse>['leases'];
</script>

<!-- <pre>{JSON.stringify(leases[0], null, 2)}</pre> -->

<div class="mt-6 overflow-hidden bg-white shadow sm:rounded-md">
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
					<button
						type="button"
						class="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Create new lease
					</button>
				</div>
			</div>
		</div>

		<ul class="divide-y divide-gray-200">
			{#each leases as lease, idx (lease.id)}
				<!-- {@const expired = daysLeftFromISO(lease.endDate) < 0} -->
				{@const expired = idx % 2 === 0}
				{@const expiredClass = expired
					? 'text-red-800 bg-red-100'
					: 'text-green-800 bg-green-100'}
				<li>
					<a href={`/lease/${lease.id}`} class="block hover:bg-gray-50">
						<div class="px-4 py-4 sm:px-6">
							<div class="flex items-center justify-between">
								<p class="truncate text-sm font-medium text-indigo-600">
									# {idx}
								</p>
								<div class="ml-2 flex flex-shrink-0">
									<p
										class={`${expiredClass} inline-flex rounded-full px-2 text-xs font-semibold leading-5`}
									>
										{expired ? 'Expired' : 'Active'}
									</p>
								</div>
							</div>
							<div class="mt-2 sm:flex sm:justify-between">
								<div class="sm:flex">
									<p class="flex items-center text-sm text-gray-500">
										<Icon
											src={Home}
											class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
											aria-hidden="true"
										/>
										{`${lease.unit?.unitNumber} ${
											lease.unit?.property?.area ?? ''
										}`}
									</p>
								</div>
								<div
									class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
								>
									<Icon
										src={Calendar}
										class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
										aria-hidden="true"
									/>
									<p>
										Expiry: <time dateTime={lease.endDate}
											>{formatDateDiff(lease.endDate).fullText}</time
										>
									</p>
								</div>
							</div>
							{#if !expired}
								<div class="mt-4 overflow-hidden rounded-full bg-gray-200">
									<div
										class="h-1 rounded-full bg-indigo-600"
										style:width={`${getProgress(
											lease.startDate,
											lease.endDate,
										)}%`}
									/>
								</div>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="text-center py-8 sm:py-16">
			<svg
				class="mx-auto h-12 w-12 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					vector-effect="non-scaling-stroke"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width={2}
					d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
				/>
			</svg>
			<h3 class="mt-2 text-sm font-medium text-gray-900">No leases</h3>
			<p class="mt-1 text-sm text-gray-500">
				Get started by creating a new lease.
			</p>
			<div class="mt-6">
				<button
					type="button"
					class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<Icon src={Plus} class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
					New Lease
				</button>
			</div>
		</div>
	{/if}
</div>
