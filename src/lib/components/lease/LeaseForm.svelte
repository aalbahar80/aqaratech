<script lang="ts">
	import { goto } from '$app/navigation';
	import getEditorErrors from '$lib/client/getEditorErrors';
	import trpc, {
		type InferMutationInput,
		type InferQueryOutput,
	} from '$lib/client/trpc';
	import { schema } from '$lib/definitions/lease';
	import { addToast } from '$lib/stores/toast';
	import { validateSchema } from '@felte/validator-zod';
	import { TRPCClientError } from '@trpc/client';
	import { addMonths, format, parseISO } from 'date-fns';
	import { createForm, getValue } from 'felte';
	import Select from 'svelte-select';
	import { scale } from 'svelte/transition';
	import type { z } from 'zod';
	import Button from '../Button.svelte';
	import ComboBox from '../form/ComboBox.svelte';
	import Input from '../form/Input.svelte';

	export let lease:
		| InferMutationInput<`leases:save`>
		| InferQueryOutput<`leases:basic`>;

	let propertyId: string = '';
	let unitList: { id: string; label: string }[] = [];
	$: getUnitList(propertyId);
	const getUnitList = async (propertyIdFilter: string) => {
		unitList = await trpc
			.query('units:search', { propertyId: propertyIdFilter })
			.then((units) =>
				units.map((unit) => ({
					id: unit.id,
					label: unit.unitNumber,
				})),
			);
	};

	$: noErrorMsg = Object.values($errors).every((e) => e === null);
	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setData,
	} = createForm({
		validate: validateSchema(schema as unknown as z.AnyZodObject),
		onError: (err) => {
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
				},
			});
			if (err instanceof TRPCClientError) {
				const serverErrors = getEditorErrors(err);
				return serverErrors;
			}
			return err;
		},
		onSubmit: async (values) => {
			console.log(values);
			const submitted = await trpc.mutation('leases:save', values);
			console.log({ submitted }, 'FormTrpc.svelte ~ 44');
			await goto(`/leases/${submitted.id}`);
			addToast({
				props: {
					kind: 'success',
					title: 'Success',
				},
			});
		},
	});

	type Trx = {
		amount: number;
		dueDate: Date;
		memo: string;
	};
	let trxList: Trx[] = [];
	let count = 2;
	$: console.log({ count }, 'LeaseForm.svelte ~ 88');
	$: console.log({ $data2 }, 'LeaseForm.svelte ~ 83');
	$: getTrxList(
		$data2.cycleCount,
		$data2.monthlyRent,
		new Date($data2.firstPayment),
	);
	function getTrxList(count: number, amount: number, start: Date) {
		let newTrxList = [];
		// get the date of the 1st day of the next month
		// const leaseStart = new Date(lease.start);
		const nextMonth = new Date(start.getFullYear(), start.getMonth() + 1, 2);
		console.log('nextMonth: ', nextMonth);

		for (let bp = 0; bp < count; bp++) {
			// TODO change to 1 month
			const dueDate = addMonths(nextMonth, bp);
			const memo = 'Rent for: ' + format(dueDate, 'MMMM yyyy');
			newTrxList.push({
				amount,
				dueDate,
				memo,
			});
		}
		trxList = newTrxList;
	}
</script>

<form use:form>
	<div>
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Location</h3>
					<p class="mt-1 text-sm text-gray-600">
						Choose the property and unit.
					</p>
				</div>
			</div>
			<div class="mt-5 md:col-span-2 md:mt-0">
				<div class="rounded-md bg-white shadow">
					<div class="space-y-6 px-4 py-5 sm:p-6">
						<!-- <Radio /> -->
						<div
							class="flex flex-col space-y-6  sm:flex-row sm:space-x-2 sm:space-y-0"
						>
							<div class="sm:w-3/4">
								<ComboBox
									entity="properties"
									on:select={(e) => {
										propertyId = e.detail.id;
									}}
									on:clear={() => {
										propertyId = '';
									}}
								/>
							</div>
							{#if propertyId}
								{#key propertyId}
									<div class="sm:w-1/4" in:scale>
										<label
											for="unit"
											class="block text-sm font-medium text-gray-700"
										>
											Unit</label
										>
										<Select id="unit" items={unitList} optionIdentifier="id" />
										<!-- {invalidText ?? ''} -->
									</div>
								{/key}
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Divider -->
	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t border-gray-200" />
		</div>
	</div>

	<div class="mt-10 sm:mt-0">
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">
						Lease Information
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
								<Input name="start" value={lease.start} />
							</div>

							<div class="col-span-6 sm:col-span-3">
								<Input name="end" value={lease.end} />
							</div>

							<div class="col-span-6 sm:col-span-6">
								<Input name="deposit" value={lease.deposit} />
							</div>

							<div class="col-span-6 sm:col-span-3">
								<Input
									name="monthlyRent"
									value={lease.monthlyRent}
									invalid={!!getValue($errors, 'monthlyRent')}
									invalidText={getValue($errors, 'monthlyRent')?.[0]}
								/>
							</div>

							<div class="col-span-6 sm:col-span-3">
								<Input
									name="firstPayment"
									value={lease.firstPayment}
									invalid={!!getValue($errors, 'firstPayment')}
									invalidText={getValue($errors, 'firstPayment')?.[0]}
								/>
							</div>

							<div class="col-span-6 sm:col-span-3">
								<Input
									name="cycleCount"
									value={lease.cycleCount}
									invalid={!!getValue($errors, 'cycleCount')}
									invalidText={getValue($errors, 'cycleCount')?.[0]}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<button
			type="button"
			class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			on:click={() => console.log($data2, $errors)}
		>
			Cancel
		</button>

		<Button
			text={lease.id ? 'Save changes' : 'Create new'}
			disabled={!noErrorMsg || $isSubmitting}
			loading={$isSubmitting}
		/>
	</div>
</form>

<!-- Divider -->
<div class="hidden sm:block" aria-hidden="true">
	<div class="py-5">
		<div class="border-t  border-gray-200" />
	</div>
</div>

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
							<Input name="start" value={lease.start} />
						</div>

						<div class="col-span-6 sm:col-span-3">
							<Input name="end" value={lease.end} />
						</div>

						{#each trxList as trx, idx}
							<div class="col-span-full flex min-w-max place-content-evenly">
								{idx + 1}
								<input
									class=""
									type="number"
									name="amount"
									value={trx.amount}
								/>
								<input
									type="date"
									name="postDate"
									value={trx.dueDate.toISOString().split('T')[0]}
								/>
								<button type="button">Delete</button>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- <pre>{JSON.stringify($data2, null, 2)}</pre> -->
<!-- <pre>{JSON.stringify(trxList, null, 2)}</pre> -->
