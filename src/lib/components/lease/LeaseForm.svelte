<script lang="ts">
	import { goto } from '$app/navigation';
	import getEditorErrors from '$lib/client/getEditorErrors';
	import trpc from '$lib/client/trpc';
	import Schedule from '$lib/components/lease/Schedule.svelte';
	import {
		defaultForm,
		generateSchedule,
		schema,
	} from '$lib/definitions/lease';
	import { addToast } from '$lib/stores/toast';
	import { forceDate } from '$lib/utils/common';
	import reporter from '@felte/reporter-tippy';
	import { validateSchema, type ValidatorConfig } from '@felte/validator-zod';
	import {
		Switch,
		SwitchDescription,
		SwitchGroup,
		SwitchLabel,
	} from '@rgossiaux/svelte-headlessui';
	import { TRPCClientError } from '@trpc/client';
	import { createForm, getValue } from 'felte';
	import Select from 'svelte-select';
	import { scale } from 'svelte/transition';
	import type { z } from 'zod';
	import Button from '../Button.svelte';
	import ComboBox from '../form/ComboBox.svelte';
	import Input from '../form/Input.svelte';

	const lease = defaultForm();
	let schedule = lease.schedule;
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
	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setFields,
		setData,
		unsetField,
	} = createForm<z.infer<typeof schema>, ValidatorConfig>({
		transform: (values) => {
			// make sure each element in schedule array is an object whose postDate is a date
			if (!Array.isArray(values.schedule)) {
				return values;
			}
			const schedule = values?.schedule.map((item) => {
				if (item?.postDate) {
					item.postDate = new Date(item.postDate).toISOString().split('T')[0];
				}
				return item;
			});
			return {
				...values,
				schedule,
			};
		},
		initialValues: {
			// avoid any dates here for seamless <input type="date">
			// initializing non-native html inputs (Switch)
			active: lease.active,
			shouldNotify: lease.shouldNotify,
		},
		schema: schema as unknown as z.AnyZodObject, // only to make linter happy
		extend: reporter(),
		validate: [
			validateSchema(schema as unknown as z.AnyZodObject),
			(values) => {
				console.log('starting manual validation');
				console.log({ values, schedule }, 'LeaseForm.svelte ~ 71');
				// this is to overcome zod's refine not working here
				const newErrors: any = {};
				if (values.start > values.end) {
					newErrors.start = 'Start date must be before end date';
					newErrors.end = 'End date must be after start date';
				}
				console.log({ newErrors }, 'LeaseForm.svelte ~ 101');
				return newErrors;
			},
		],
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
			console.log({ values }, 'LeaseForm.svelte ~ 95');
			console.log({ schedule }, 'LeaseForm.svelte ~ 96');
			const submitted = await trpc.mutation('leases:save', values);
			// add leaseId: submitted.id to each element in the schedule
			const newTransactions = schedule.map((e) => ({
				leaseId: submitted.id,
				dueDate: e.postDate,
				isPaid: false,
				...e,
			}));
			const submittedTrxs = await trpc.mutation(
				'transactions:saveMany',
				newTransactions,
			);
			console.log({ submitted }, 'LeaseForm.svelte ~ 108');
			console.log({ submittedTrxs }, 'LeaseForm.svelte ~ 109');
			await goto(`/leases/${submitted.id}`);
			addToast({
				props: {
					kind: 'success',
					title: 'Success',
				},
			});
		},
	});
	// setData('schedule', lease.schedule);

	let count = 3;
	const handleCountChange = (newCount: number) => {
		schedule = generateSchedule({
			scheduleStart: forceDate($data2.start),
			amount: $data2.monthlyRent,
			count: newCount,
		});
	};
	const handleAmountChange = (newAmount: number) => {
		schedule = generateSchedule({
			scheduleStart: forceDate($data2.start),
			amount: newAmount,
			count,
		});
	};
	$: setData('schedule', schedule);
	// recursively check if every value in the object is null
	// const checkForNull = (obj: any) =>
	// 	Object.values(obj).every((e) => {
	// 		if (e === null) {
	// 			return true;
	// 		}
	// 		if (typeof e === 'object') {
	// 			return Object.values(e).every((ee) => ee === null);
	// 		}
	// 		return false;
	// 	});
	// $: noErrorMsg = checkForNull($errors);
</script>

<form use:form>
	<!-- Tenant -->
	<div>
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Tenant</h3>
					<p class="mt-1 text-sm text-gray-600">
						Tenants needs to be created before they can be added to a lease.
					</p>
					<span class="mt-4 sm:mt-0">
						<a
							href="/tenants/add"
							class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
						>
							Create new tenant<span aria-hidden="true"> &rarr;</span>
						</a>
					</span>
				</div>
			</div>
			<div class="mt-5 md:col-span-2 md:mt-0">
				<div class="rounded-md bg-white shadow">
					<div class="space-y-6 px-4 py-5 sm:p-6">
						<div
							class="flex flex-col space-y-6  sm:flex-row sm:space-x-2 sm:space-y-0"
						>
							<div class="w-full">
								<ComboBox
									entity="tenants"
									on:select={(e) => {
										setData('tenantId', e.detail.id);
									}}
									on:clear={() => {
										setData('tenantId', '');
									}}
									invalidText={getValue($errors, 'tenantId')?.[0]}
								/>
							</div>
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
									invalidText={getValue($errors, 'unitId')?.[0]}
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
										<Select
											id="unit"
											items={unitList}
											optionIdentifier="id"
											on:select={(e) => {
												setData('unitId', e.detail.id);
											}}
											on:clear={() => {
												setData('unitId', '');
											}}
											hasError={!!getValue($errors, 'unitId')}
										/>
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

							<!-- Start Date -->
							<div class="col-span-6 sm:col-span-3">
								<Input
									name="start"
									value={lease.start}
									invalid={!!getValue($errors, 'start')}
									invalidText={getValue($errors, 'start')?.[0]}
								/>
							</div>

							<!-- End Date -->
							<div class="col-span-6 sm:col-span-3">
								<Input
									name="end"
									value={lease.end}
									invalid={!!getValue($errors, 'end')}
									invalidText={getValue($errors, 'end')?.[0]}
								/>
							</div>

							<!-- Rent amount -->
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
										handleAmountChange(e.currentTarget.valueAsNumber);
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
			loading={$isSubmitting}
			text={lease.id ? 'Save changes' : 'Create new'}
			disabled={$isSubmitting}
		/>
	</div>

	<!-- Divider -->
	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t  border-gray-200" />
		</div>
	</div>

	<!-- Payment Schedule section -->
	<Schedule
		roschedule={$data2.schedule}
		errors={$errors}
		on:delete={(e) => {
			unsetField(`schedule.${e.detail}`);
		}}
		on:countChange={(e) => {
			handleCountChange(e.detail);
		}}
	/>
</form>

<pre>{JSON.stringify({ data2: $data2 }, null, 2)}</pre>
<pre>{JSON.stringify($errors, null, 2)}</pre>

<style lang="postcss">
	input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
	input.invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}

	/* Remove arrow steppers */
	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
