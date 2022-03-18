<script lang="ts">
	import { Check, ThumbUp, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}
	const eventTypes = {
		applied: { icon: User, bgColorClass: 'bg-gray-400' },
		advanced: { icon: ThumbUp, bgColorClass: 'bg-blue-500' },
		completed: { icon: Check, bgColorClass: 'bg-green-500' },
		scheduled: { icon: Check, bgColorClass: 'bg-green-500' },
	};
	const timeline = [
		{
			id: 1,
			type: eventTypes.applied,
			content: 'Applied to',
			target: 'Front End Developer',
			date: 'Sep 20',
			datetime: '2020-09-20',
		},
		{
			id: 2,
			type: eventTypes.advanced,
			content: 'Advanced to phone screening by',
			target: 'Bethany Blake',
			date: 'Sep 22',
			datetime: '2020-09-22',
		},
		{
			id: 3,
			type: eventTypes.completed,
			content: 'Completed phone screening with',
			target: 'Martha Gardner',
			date: 'Sep 28',
			datetime: '2020-09-28',
		},
		{
			id: 4,
			type: eventTypes.advanced,
			content: 'Advanced to interview by',
			target: 'Bethany Blake',
			date: 'Sep 30',
			datetime: '2020-09-30',
		},
		{
			id: 5,
			type: eventTypes.completed,
			content: 'Completed interview with',
			target: 'Katherine Snyder',
			date: 'Oct 4',
			datetime: '2020-10-04',
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
				{#each timeline as item, itemIdx (item.id)}
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
										class={classNames(
											item.type.bgColorClass,
											'flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white',
										)}
									>
										<Icon
											src={item.type.icon}
											theme="solid"
											class="h-5 w-5 text-white"
											aria-hidden="true"
										/>
									</span>
								</div>
								<div
									class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5"
								>
									<div>
										<p class="text-sm text-gray-500">
											{item.content}{' '}
											<a href="#" class="font-medium text-gray-900">
												{item.target}
											</a>
										</p>
									</div>
									<div
										class="whitespace-nowrap text-right text-sm text-gray-500"
									>
										<time dateTime={item.datetime}>{item.date}</time>
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
