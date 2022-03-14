<script lang="ts">
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { generateSchedule } from '$lib/definitions/lease';

	export let amount: number;

	let count = 12;
	let scheduleStart = new Date();
	let schedule = generateSchedule({ scheduleStart, amount, count });

	const handleCountChange = () => {
		schedule = generateSchedule({ scheduleStart, amount, count });
	};

	const handleAmountChange = (newAmount: number) => {
		schedule = generateSchedule({ scheduleStart, amount: newAmount, count });
	};
	$: handleAmountChange(amount);

	const remove = (nanoid: string) => {
		schedule = schedule.filter((n) => n.nanoid !== nanoid);
		count = schedule.length;
	};
</script>

<div class="mt-10 sm:mt-0">
	<div class="md:grid md:grid-cols-3 md:gap-6">
		<div class="md:col-span-1">
			<div class="px-4 sm:px-0">
				<h3 class="text-lg font-medium leading-6 text-gray-900">
					Payment Schedule
				</h3>
				<p class="mt-1 text-sm text-gray-600">
					Use a permanent address where you can receive mail.
				</p>
			</div>
		</div>
		<div class="mt-5 md:col-span-2 md:mt-0">
			<div class="overflow-hidden shadow sm:rounded-md">
				<div class="bg-white px-4 py-5 sm:p-6">
					<div class="grid grid-cols-6 gap-6">
						<div class="col-span-6 sm:col-span-3">
							<label
								for="scheduleStart"
								class="text-sm font-medium text-gray-700"
							>
								First Payment
							</label>
							<input
								id="scheduleStart"
								name="scheduleStart"
								value={scheduleStart.toISOString().split('T')[0]}
								type="date"
								on:change={(e) => {
									scheduleStart = new Date(e.target?.value);
									schedule = generateSchedule({ scheduleStart, amount, count });
								}}
							/>
						</div>

						<div class="col-span-6 sm:col-span-3">
							<label for="count" class="text-sm font-medium text-gray-700">
								Count
							</label>
							<input
								id="count"
								name="count"
								bind:value={count}
								type="number"
								on:change={handleCountChange}
							/>
						</div>

						<!-- {#if schedule} -->
						{#each schedule as trx, idx (trx.nanoid)}
							<div
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
										id={`${trx.nanoid}-amount`}
										name={`${trx.nanoid}-amount`}
										value={trx.amount}
										type="number"
										class="schedule block min-w-0 flex-1 rounded-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:rounded-l-none sm:text-sm"
									/>
								</div>
								<span class="w-1/3 flex-1 sm:flex-initial">
									<input
										type="date"
										id={`${trx.nanoid}-postDate`}
										name={`${trx.nanoid}-postDate`}
										value={trx.postDate.toISOString().split('T')[0]}
									/>
								</span>
								<button
									class="w-1/12"
									on:click|preventDefault={() => {
										remove(trx.nanoid);
									}}
								>
									<Icon
										src={Trash}
										class="mr-1.5 h-5 w-5 flex-shrink-0 text-red-300"
										aria-hidden="true"
									/>
								</button>
							</div>
						{/each}
						<!-- {/if} -->
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

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
