<script lang="ts">
	import { dev } from '$app/env';
	import { goto } from '$app/navigation';
	import getEditorErrors from '$lib/client/getEditorErrors';
	import { trpc } from '$lib/client/trpc';
	import Schedule from '$lib/components/lease/Schedule.svelte';
	import { Field } from '$lib/models/classes/Field.class';
	import { scheduleSchema } from '$lib/models/schemas/lease.schema';
	import { addToast } from '$lib/stores/toast';
	import { classes } from '$lib/utils';
	import { forceDate, forceDateToInput, toDateInput } from '$lib/utils/common';
	import type { Predefined } from '$models/interfaces/lease.interface';
	import reporter from '@felte/reporter-tippy';
	import { validateSchema, type ValidatorConfig } from '@felte/validator-zod';
	import {
		Switch,
		SwitchDescription,
		SwitchGroup,
		SwitchLabel,
	} from '@rgossiaux/svelte-headlessui';
	import { TRPCClientError } from '@trpc/client';
	import { addDays } from 'date-fns';
	import { createForm, getValue } from 'felte';
	import { onMount } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import { v4 as uuidv4 } from 'uuid';
	import type { z } from 'zod';
	import { Lease } from '../../models/classes/lease.class';
	import Button from '../Button.svelte';
	import Input from '../form/Input.svelte';
	import SelectEntity from '../form/SelectEntity.svelte';

	export let predefined: Predefined;

	const lease = {
		...new Lease({}).defaultForm(),
		...predefined,
	};

	let client = lease.client;
	let property = lease.property;
	let unit = lease.unit;
	let tenant = lease.tenant;

	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setFields,
		setData,
		unsetField,
		isValid,
	} = createForm<z.infer<typeof Lease.leaseFormSchema>, ValidatorConfig>({
		transform: (values: unknown) => {
			// make sure each element in schedule array is an object whose postAt is a date
			const original = values as z.infer<typeof Lease.leaseFormSchema>;
			const newValues = {} as any;
			if (Array.isArray(original.schedule)) {
				newValues.schedule = original?.schedule.map((item) => {
					if (item?.postAt) {
						return {
							...item,
							postAt: forceDateToInput(item.postAt),
						};
					}
					return item;
				});
			}
			if (original.start) {
				newValues.start = forceDateToInput(original.start);
			}
			if (original.end) {
				newValues.end = forceDateToInput(original.end);
			}
			return {
				...original,
				...newValues,
			};
		},
		initialValues: lease,
		schema: Lease.leaseFormSchema, // only to make linter happy
		extend: reporter(),
		validate: validateSchema(Lease.leaseFormSchema),
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
			try {
				console.log({ values }, 'LeaseForm.svelte ~ 95');
				const { schedule: unparsed, ...leaseValues } = values;
				const schedule = scheduleSchema.parse(unparsed);
				const newLease = await trpc().mutation('leases:save', leaseValues);
				console.log({ newLease }, 'LeaseForm.svelte ~ 108');
				const trxValues = schedule.map((e) => ({
					id: uuidv4(),
					leaseId: newLease.id,
					dueAt: addDays(e.postAt, 14),
					isPaid: false,
					paidAt: null,
					...e,
					postAt: e.postAt,
				}));
				const newTrxs = await trpc().mutation(
					'transactions:saveMany',
					trxValues,
				);
				console.log(`created ${newTrxs.count} transactions`);

				await goto(`/leases/${newLease.id}`);
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
						title: 'An error occured.',
					},
				});
			}
		},
	});

	const handleCountChange = (newCount: number) => {
		const newSchedule = Lease.generateSchedule({
			scheduleStart: forceDate($data2.start),
			amount: $data2.monthlyRent,
			count: newCount,
		});
		setData('schedule', newSchedule);
	};
	const handleAmountChange = (newAmount: number) => {
		const newSchedule = Lease.generateSchedule({
			scheduleStart: forceDate($data2.start),
			amount: newAmount,
			count: $data2.schedule.length, // TODO reconsider
		});
		setData('schedule', newSchedule);
	};

	onMount(() => {
		if (lease.monthlyRent) {
			handleAmountChange(lease.monthlyRent);
		}
	});
</script>

<form use:form data-test={$isValid ? 'ok' : 'error'}>
	<!-- Tenant -->
	<div>
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">Tenant</h3>
					<p class="mt-1 text-sm text-gray-600">
						Tenants must be created before they can be added to a lease.
					</p>
					<span class="mt-4 sm:mt-0">
						<a
							href="/new/tenants"
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
								<!-- optionLabel={oldLease?.tenant ?? null} -->
								<SelectEntity
									field="tenantId"
									selected={tenant}
									invalid={!!getValue($errors, 'tenantId')}
									on:select={(e) => {
										setData('tenantId', e.detail.value);
									}}
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
								<SelectEntity
									field="clientId"
									bind:selected={client}
									invalid={!!getValue($errors, 'unitId') && !client}
									on:select={() => {
										property = undefined;
										unit = undefined;
										setData('unitId', null);
									}}
								/>
							</div>
						</div>
						<div
							class="flex flex-col space-y-6  sm:flex-row sm:space-x-2 sm:space-y-0"
						>
							<div class="sm:w-3/4">
								<SelectEntity
									field="propertyId"
									bind:selected={property}
									parent={client}
									disabled={!client}
									invalid={!!getValue($errors, 'unitId') && !property}
									on:select={() => {
										unit = undefined;
										setData('unitId', null);
									}}
								/>
							</div>
							<div class="sm:w-1/4">
								<SelectEntity
									field="unitId"
									bind:selected={unit}
									parent={property}
									disabled={!property}
									invalid={!!getValue($errors, 'unitId')}
									on:select={(e) => {
										setData('unitId', e.detail.value);
									}}
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

	<!-- Lease Basic Info -->
	<div class="mt-10 sm:mt-0">
		<div class="md:grid md:grid-cols-3 md:gap-6">
			<div class="md:col-span-1">
				<div class="px-4 sm:px-0">
					<h3 class="text-lg font-medium leading-6 text-gray-900">
						Lease Information
					</h3>
					<p class="mt-1 text-sm text-gray-600">
						You can edit this information later.
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
											Active
										</SwitchLabel>
										<SwitchDescription
											as="span"
											class="w-3/4 text-sm text-gray-500"
										>
											Would you like to activate this lease now? Payments can
											only be made once a lease is active.
										</SwitchDescription>
									</span>
									<Switch
										checked={!getValue($data2, 'deactivated')}
										let:checked
										on:change={(e) => {
											setFields('deactivated', !e.detail, true);
										}}
										class={classes(
											!$data2.deactivated ? 'bg-indigo-600' : 'bg-gray-200',
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
											Send payment reminders to tenant (sms/email)
										</SwitchDescription>
									</span>
									<Switch
										checked={$data2.notify}
										let:checked
										on:change={(e) => {
											setFields('notify', e.detail, true);
										}}
										class={classes(
											$data2.notify ? 'bg-indigo-600' : 'bg-gray-200',
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
									field={new Field('start', {
										type: 'date',
										required: true,
										value: toDateInput(lease.start),
									})}
									errors={$errors}
								/>
							</div>

							<!-- End Date -->
							<div class="col-span-6 sm:col-span-3">
								<Input
									field={new Field('end', {
										type: 'date',
										required: true,
										value: toDateInput(lease.end),
									})}
									errors={$errors}
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

	<!-- Divider -->
	<div class="hidden sm:block" aria-hidden="true">
		<div class="py-5">
			<div class="border-t  border-gray-200" />
		</div>
	</div>

	<!-- Payment Schedule section -->
	<Schedule
		schedule={$data2.schedule}
		errors={$errors}
		on:delete={(e) => {
			unsetField(`schedule.${e.detail}`);
		}}
		on:countChange={(e) => {
			handleCountChange(e.detail);
		}}
	/>

	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<Button
			loading={$isSubmitting}
			text={lease.id ? 'Save changes' : 'Create new'}
			disabled={$isSubmitting}
		/>
	</div>
</form>

{#if dev}
	<div class="prose py-6"><pre>{JSON.stringify($data2, null, 2)}</pre></div>
	<div class="prose py-6"><pre>{JSON.stringify($errors, null, 2)}</pre></div>
{/if}

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
