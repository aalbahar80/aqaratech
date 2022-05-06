<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { addToast } from '$lib/stores/toast';
	import { faBellSlash } from '@fortawesome/free-solid-svg-icons/faBellSlash';
	import { Speakerphone } from '@steeze-ui/heroicons';
	import { formatRelative } from 'date-fns';
	import Fa from 'svelte-fa';
	import Button from './Button.svelte';

	type TimelineEvent = {
		date: Date;
		status: 'SCHEDULED' | 'SENT' | 'DELIVERED' | 'FAILED';
	};

	export let trx: InferQueryOutput<'transactions:read'>;
	export let nextReminder: string | null;
	console.log({ nextReminder }, 'Timeline.svelte ~ 18');
	let timeline: TimelineEvent[] = [];
	if (nextReminder) {
		const next: TimelineEvent = {
			status: 'SCHEDULED',
			date: new Date(nextReminder),
		};
		timeline = [next, ...timeline];
	}

	let loadingSend = false;
	const send = async () => {
		loadingSend = true;
		try {
			const res = await fetch('/api/sms', {
				method: 'POST',
				body: JSON.stringify({
					phone:
						import.meta.env.VITE_VERCEL_ENV !== 'production'
							? '+15005550006'
							: trx.lease.tenant.phone,
					// phone: '+15005550009', // invalid
					message: `Use the link below to pay your rent.\n${
						import.meta.env.BASE_URL
					}/p/transactions/${trx.id}`,
				}),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Unable to send SMS');

			addToast({
				props: {
					kind: 'success',
					title: 'Success',
				},
			});
		} catch (e) {
			console.error(e);
			addToast({
				props: {
					kind: 'error',
					title: e instanceof Error ? e.message : 'Unable to send SMS',
				},
			});
		} finally {
			loadingSend = false;
		}
	};
</script>

<section aria-labelledby="timeline-title" class="lg:col-span-1 lg:col-start-3">
	<div class="rounded-lg bg-white px-4 py-5 shadow sm:px-6">
		{#if timeline.length}
			<h2 id="timeline-title" class="text-lg font-medium text-gray-900">
				Scheduled Notifications
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
											{#if item.status === 'SCHEDULED'}
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
												{item.status.toLocaleLowerCase()}
											</p>
										</div>
										<div
											class="whitespace-nowrap text-right text-sm text-gray-500"
										>
											<time
												class="capitalize"
												dateTime={item.date.toISOString()}
											>
												{formatRelative(item.date, new Date(), {
													// locale: enGB,
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
		{:else}
			<div class="text-center">
				<Fa
					icon={faBellSlash}
					class="mx-auto h-12 w-12 my-4 text-gray-400"
					size="2x"
				/>
				<h3 class="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
				<p class="mt-1 text-sm text-gray-500">
					There are no scheduled reminders for this transaction.
				</p>
			</div>
		{/if}
		<div class="justify-stretch mt-6 flex flex-col">
			<Button
				icon={Speakerphone}
				text="Send reminder now"
				solid
				on:click={send}
				disabled={trx.isPaid}
				loading={loadingSend}
			/>
		</div>
	</div>
</section>
