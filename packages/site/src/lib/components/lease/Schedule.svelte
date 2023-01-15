<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	import { getRoute, PageTab } from '@self/utils';

	import { createApi } from '$api';
	import L from '$i18n/i18n-svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { getIntlLabel } from '$lib/i18n/get-intl-label';
	import { generateSchedule } from '$lib/utils/generate-schedule';

	import type { LeaseDto } from '$api/openapi';

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
		const created = await createApi().organizations.createInvoices({
			organizationId: lease.organizationId,
			id: lease.id,
			createManyLeaseInvoicesDto: schedule.map((invoice) => ({
				// don't spread invoice to avoid sending tempid field
				amount: invoice.amount,
				postAt: invoice.postAt,
				portfolioId: lease.portfolioId,
				isPaid: false,
			})),
		});
		console.debug(created);

		const url = getRoute({
			entity: 'lease',
			pageType: PageTab.Invoices,
			id: lease.id,
			params: $page.params,
		});

		void goto(url);
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
								<div class="py-5">
									<div class="border-t  border-gray-200" />
								</div>
							</div>

							{#each schedule as trx, idx (trx.tempid)}
								<div
									animate:flip={{ duration: 200 }}
									transition:fade|local={{ duration: 100 }}
									class="col-span-full flex place-content-between items-center space-x-2"
								>
									<!-- Number -->
									<div class="hidden w-6 sm:block">
										{idx + 1}
									</div>

									<!-- Amount -->
									<div class="inline-flex shadow-sm">
										<span
											class="hidden items-center self-stretch rounded-md rounded-r-none border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500 sm:inline-flex"
											>KWD</span
										>
										<label>
											<span class="sr-only">{getIntlLabel('amount')} {idx}</span
											>
											<input
												id="schedule-{idx}-amount"
												name="schedule-{idx}-amount"
												bind:value={trx.amount}
												type="number"
												class="rounded-md sm:rounded-l-none"
												class:invalid={trx.amount < 1}
											/>
										</label>
									</div>

									<!-- Date -->
									<div class="">
										<label>
											<span class="sr-only">{getIntlLabel('postAt')} {idx}</span
											>
											<input
												id="schedule-{idx}-postAt"
												name="schedule-{idx}-postAt"
												type="date"
												bind:value={trx.postAt}
												class="rounded-md shadow-sm"
												class:invalid={new Date(trx.postAt) < startLimit}
											/>
										</label>
									</div>

									<!-- Delete -->
									<button
										class=""
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

	<div class="flex flex-shrink-0 justify-end gap-x-4 px-4 py-4">
		<Button text={$L.buttons.save()} />
	</div>
</form>

<!-- <DebugPane data={schedule} /> -->
<style lang="postcss">
	input {
		@apply w-full min-w-[90px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm lg:min-w-full;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}

	input.invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
