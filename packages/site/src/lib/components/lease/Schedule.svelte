<script lang="ts">
	import { createApi } from '$api';
	import type { LeaseDto } from '$api/openapi';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/buttons/Button.svelte';
	import { generateSchedule } from '$lib/utils/generate-schedule';
	import { entitiesMap } from '@self/utils';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import HeroiconsTrash from '~icons/heroicons/trash';

	export let lease: LeaseDto;

	const getSchedule = (n: number) => {
		return generateSchedule({
			scheduleStart: new Date(lease.start),
			amount: lease.monthlyRent,
			count: n,
		});
	};

	let schedule = getSchedule(12);

	// set startLimit to be one day before lease start date
	const startLimit = new Date(
		new Date(lease.start).getTime() - 1000 * 60 * 60 * 24,
	);

	const onSubmit = async () => {
		const created = await createApi().leases.createInvoices({
			id: lease.id,
			createManyLeaseInvoicesDto: schedule.map((invoice) => ({
				// don't spread invoice to avoid sending tempid field
				amount: invoice.amount,
				postAt: `${invoice.postAt}T00:00:00.000Z`,
				organizationId: lease.organizationId,
				portfolioId: lease.portfolioId,
			})),
		});
		console.debug(created);

		goto(`/${entitiesMap.lease.urlName}/${lease.id}`);
	};
</script>

<form on:submit|preventDefault={onSubmit}>
	<div class="mt-10 sm:mt-0">
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">
						Payment Schedule
					</h3>
					<p class="mt-1 text-sm text-gray-600">
						Transactions may be edited or deleted as long as they have not been
						paid. New transactions may also be added at a later time.
					</p>
				</div>
			</div>
			<div class="mt-5 md:col-span-2 md:mt-0">
				<div class="overflow-hidden shadow sm:rounded-md">
					<div class="bg-white px-4 py-5 sm:p-6">
						<div class="grid grid-cols-6 gap-6">
							<div class="col-span-6 sm:col-span-3">
								<label for="count" class="text-sm font-medium text-gray-700">
									Count
								</label>
								<input
									id="count"
									value={schedule.length}
									min="1"
									max="100"
									type="number"
									on:change={(e) => {
										schedule = getSchedule(e.currentTarget.valueAsNumber);
									}}
								/>
							</div>

							<!-- Divider -->
							<div aria-hidden="true" class="col-span-full">
								<div class="py-5 ">
									<div class="border-t  border-gray-200" />
								</div>
							</div>

							{#each schedule as trx, idx (trx.tempid)}
								<div
									animate:flip={{ duration: 200 }}
									transition:fade|local={{ duration: 100 }}
									class="col-span-full flex place-content-between items-center space-x-2"
								>
									<div class="hidden w-1/12 sm:block">
										{idx + 1}
									</div>
									<div class="flex w-1/3 shadow-sm">
										<span
											class="hidden items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:inline-flex sm:text-sm"
										>
											KWD
										</span>
										<input
											id="schedule.{idx}.amount"
											name="schedule.{idx}.amount"
											bind:value={trx.amount}
											type="number"
											class="schedule block min-w-0 flex-1 rounded-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:rounded-l-none sm:text-sm"
											class:invalid={trx.amount < 1}
										/>
									</div>
									<span class="w-1/3 flex-1 sm:flex-initial">
										<!-- <pre>{JSON.stringify(trx.postAt, null, 2)}</pre> -->
										<input
											id="schedule.{idx}.postAt"
											name="schedule.{idx}.postAt"
											type="date"
											bind:value={trx.postAt}
											class:invalid={new Date(trx.postAt) < startLimit}
										/>
									</span>
									<button
										class="w-1/12"
										on:click|preventDefault={() => {
											schedule = schedule.filter((_, i) => i !== idx);
										}}
									>
										<HeroiconsTrash
											class="mr-1.5 h-5 w-5 flex-shrink-0 text-red-300"
											aria-hidden="true"
										/>
									</button>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<Button text={'Create'} />
	</div>
</form>

{#if dev}
	<div class="prose py-6"><pre>{JSON.stringify(schedule, null, 2)}</pre></div>
{/if}

<style lang="postcss">
	input:not(.schedule) {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
	input.invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}

	/* Remove arrow steppers */
	/* Firefox */
	input[type='number']:not([id='count']) {
		-moz-appearance: textfield;
	}
	/* Chrome, Safari, Edge, Opera */
	input:not([id='count'])::-webkit-outer-spin-button,
	input:not([id='count'])::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
