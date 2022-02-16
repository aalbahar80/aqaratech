<script lang="ts">
	import { formatDateDiff } from '$lib/utils/date-utils';
	import { Calendar, Home } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let leases: any[];
</script>

<!-- <pre>{JSON.stringify(leases[0], null, 2)}</pre> -->

<div class="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
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
									{lease.unit?.unitNumber}
								</p>
							</div>
							<div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
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
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>
