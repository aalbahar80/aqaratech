<script lang="ts">
	import { formatRelative } from 'date-fns';
	import { enGB } from 'date-fns/locale';
	import lowerCase from 'lodash-es/lowerCase.js';

	type Timeline = {
		date: Date;
		status: 'SCHEDULED' | 'SENT' | 'DELIVERED' | 'FAILED';
	}[];

	export let timeline: Timeline = [
		{
			status: 'SCHEDULED',
			date: new Date('2022-12-30'),
		},
		{
			status: 'SENT',
			date: new Date('2022-03-19'),
		},
		{
			status: 'DELIVERED',
			date: new Date('2022-03-17'),
		},
		{
			status: 'DELIVERED',
			date: new Date(),
		},
		{
			status: 'FAILED',
			date: new Date('2022-03-13T14:00:00.000Z'),
		},
	];
</script>

<section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
	<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
		<h2 id="timeline-title" class="text-lg font-medium text-gray-900">
			Timeline
		</h2>

		<!-- Activity Feed -->
		<div class="mt-6 flow-root">
			<ul class="-mb-8">
				{#each timeline as item, itemIdx}
					<li>
						<div class="relative pb-8">
							{#if itemIdx !== timeline.length - 1}
								<span
									class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
									aria-hidden="true"
								/>
							{/if}
							<div class="relative flex space-x-3">
								<div>
									<span
										class="flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white"
										class:bg-red-400={item.status === 'FAILED'}
										class:bg-green-400={item.status === 'DELIVERED' ||
											item.status === 'SENT'}
										class:bg-sky-500={item.status === 'SCHEDULED'}
									>
										{#if item.status === 'SCHEDULED' || item.status === 'SENT'}
											<span
												class="h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"
											/>
										{/if}
									</span>
								</div>
								<div
									class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
								>
									<div>
										<p class="text-sm capitalize text-gray-500">
											{lowerCase(item.status)}
										</p>
									</div>
									<div
										class="whitespace-nowrap text-right text-sm text-gray-500"
									>
										<time class="capitalize" dateTime={item.date.toISOString()}>
											{formatRelative(item.date, new Date(), {
												locale: enGB,
											})}
										</time>
									</div>
								</div>
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div class="justify-stretch mt-6 flex flex-col">
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
			>
				Send Reminder now
			</button>
		</div>
	</div>
</section>
