<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { addToast } from '$lib/stores/toast';
	import { kwdFormat } from '$lib/utils/common';
	import { Speakerphone } from '@steeze-ui/heroicons';
	import { formatRelative } from 'date-fns';
	import { enGB } from 'date-fns/locale';
	import lowerCase from 'lodash-es/lowerCase.js';
	import Button from './Button.svelte';

	type Timeline = {
		date: Date;
		status: 'SCHEDULED' | 'SENT' | 'DELIVERED' | 'FAILED';
	}[];

	export let trx: InferQueryOutput<'transactions:read'>;
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

	let loadingSend = false;
	const send = async () => {
		loadingSend = true;
		try {
			const res = await fetch('/api/sms', {
				method: 'POST',
				body: JSON.stringify({
					// phone: trx.lease.tenant.phone,
					phone: '+96599123456',
					// phone: '+15005550009', // invalid
					message: `Your transaction of ${kwdFormat(
						trx.amount,
					)} KWD has been received.`,
				}),
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.message || 'Unable to send SMS');

			console.log({ data }, '[id].svelte ~ 82');
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
	<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
		<h2 id="timeline-title" class="text-lg font-medium text-gray-900">
			Notification Timeline
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
