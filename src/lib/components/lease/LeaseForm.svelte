<script lang="ts">
	import { goto } from '$app/navigation';
	import getEditorErrors from '$lib/client/getEditorErrors';
	import trpc, { type InferMutationInput } from '$lib/client/trpc';
	// import { schema, generateSchedule } from '$lib/definitions/lease';
	import { schema } from '$lib/definitions/lease';
	import { addToast } from '$lib/stores/toast';
	import reporter from '@felte/reporter-tippy';
	import { validateSchema } from '@felte/validator-zod';
	import {
		Switch,
		SwitchDescription,
		SwitchGroup,
		SwitchLabel,
	} from '@rgossiaux/svelte-headlessui';
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { TRPCClientError } from '@trpc/client';
	import { createForm, getValue } from 'felte';
	import Select from 'svelte-select';
	import { scale } from 'svelte/transition';
	import type { z } from 'zod';
	import Button from '../Button.svelte';
	import ComboBox from '../form/ComboBox.svelte';
	import Input from '../form/Input.svelte';

	export let lease: InferMutationInput<'leases:save'>;

	let propertyId: string = '';
	let unitList: { id: string; label: string }[] = [];
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
	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	$: getUnitList(propertyId);

	function classes(...classList: string[]) {
		return classList.filter(Boolean).join(' ');
	}
	$: noErrorMsg = Object.values($errors).every((e) => e === null);
	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setFields,
	} = createForm({
		extend: reporter(),
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
			console.log('submitting');
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

	$: console.log($data2, 'LeaseForm.svelte ~ 105');
</script>

<form use:form>
	<!-- Property/Unit section -->
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

	<!-- Lease Basic Info -->
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
							<div class="col-span-6">
								<SwitchGroup class="flex items-center justify-between">
									<span class="flex flex-grow flex-col">
										<SwitchLabel
											as="span"
											class="text-sm font-medium text-gray-700"
										>
											Signed
										</SwitchLabel>
										<SwitchDescription as="span" class="text-sm text-gray-500">
											Whether this lease is signed or not.
										</SwitchDescription>
									</span>
									<Switch
										checked={!!getValue($data2, 'active')}
										let:checked
										on:change={(e) => {
											setFields('active', e.detail, true);
										}}
										class={classes(
											$data2.active ? 'bg-indigo-600' : 'bg-gray-200',
											'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
										)}
									>
										<span
											aria-hidden="true"
											class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
											class:translate-x-5={checked}
											class:translate-x-0={!checked}
										/>
									</Switch>
								</SwitchGroup>
							</div>

							<div class="col-span-6">
								<SwitchGroup class="flex items-center justify-between">
									<span class="flex flex-grow flex-col">
										<SwitchLabel
											as="span"
											class="text-sm font-medium text-gray-700"
										>
											Auto payment reminders
										</SwitchLabel>
										<SwitchDescription as="span" class="text-sm text-gray-500">
											Enable automatic reminders for the tenant to pay rent.
										</SwitchDescription>
									</span>
									<Switch
										checked={$data2.shouldNotify}
										let:checked
										on:change={(e) => {
											setFields('shouldNotify', e.detail, true);
										}}
										class={classes(
											$data2.shouldNotify ? 'bg-indigo-600' : 'bg-gray-200',
											'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
										)}
									>
										<span
											aria-hidden="true"
											class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
											class:translate-x-5={checked}
											class:translate-x-0={!checked}
										/>
									</Switch>
								</SwitchGroup>
							</div>
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
								<label
									for="monthlyRent"
									class="text-sm font-medium text-gray-700"
								>
									Rent
								</label>
								<input
									id="monthlyRent"
									name="monthlyRent"
									value={lease.monthlyRent}
									type="number"
									class:invalid={!!getValue($errors, 'monthlyRent')}
									on:change={(e) => {
										const newSchedule = generateSchedule(
											getValue($data2, 'cycleCount'),
											Number(e.currentTarget.value),
											new Date(getValue($data2, 'start')),
										);
										setFields('schedule', newSchedule);
									}}
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
			loading={$isSubmitting}
		/>
		<!-- disabled={!noErrorMsg || $isSubmitting} -->
	</div>

	<!-- <pre>{JSON.stringify($data2, null, 2)}</pre> -->
	<!-- Divider -->
	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t  border-gray-200" />
		</div>
	</div>

	<!-- Payment Schedule section -->
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
									for="firstPayment"
									class="text-sm font-medium text-gray-700"
								>
									First Payment
								</label>
								<input
									id="firstPayment"
									name="firstPayment"
									value={lease.firstPayment}
									type="date"
									class:invalid={!!getValue($errors, 'firstPayment')}
								/>
							</div>

							<div class="col-span-6 sm:col-span-3">
								<label
									for="cycleCount"
									class="text-sm font-medium text-gray-700"
								>
									Count
								</label>
								<input
									id="cycleCount"
									name="cycleCount"
									value={lease.cycleCount}
									type="number"
									class:invalid={!!getValue($errors, 'cycleCount')}
									on:change={(e) => {
										trxList = generateSchedule(
											+e.currentTarget.value,
											getValue($data2, 'monthlyRent'),
											new Date(getValue($data2, 'start')),
										);
									}}
								/>
							</div>

							{#each trxList as trx, idx (trx.id)}
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
											id={`schedule.${idx}.amount`}
											name={`schedule.${idx}.amount`}
											value={trx.amount}
											type="number"
											class="schedule block min-w-0 flex-1 rounded-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:rounded-l-none sm:text-sm"
											class:invalid={!!getValue(
												$errors,
												`schedule.${idx}.amount`,
											)}
										/>
									</div>
									<span class="w-1/3 flex-1 sm:flex-initial">
										<!-- value={trx.dueDate.toISOString().split('T')[0]} -->
										<input
											type="date"
											id={`schedule.${idx}.postDate`}
											name={`schedule.${idx}.postDate`}
											value={trx.postDate}
											class:invalid={!!getValue(
												$errors,
												`schedule.${idx}.postDate`,
											)}
										/>
									</span>
									<button
										class="w-1/12"
										on:click|preventDefault={() => {
											// trxList = trxList.filter((_, i) => i !== idx);
											// setFields('cycleCount', trxList.length, true);
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
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>

<pre>{JSON.stringify(trxList, null, 2)}</pre>

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
	input[type='number']:not([id='cycleCount']) {
		-moz-appearance: textfield;
	}
	/* Chrome, Safari, Edge, Opera */
	input:not([id='cycleCount'])::-webkit-outer-spin-button,
	input:not([id='cycleCount'])::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
