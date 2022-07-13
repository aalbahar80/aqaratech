<script lang="ts">
	import SelectArea from '$components/form/inputs/SelectArea.svelte';
	import Select from '$components/Select.svelte';
	import {
		AsyncSelectField,
		SelectField,
		type Field,
	} from '$lib/models/classes/Field.class';
	import type { Option } from '$lib/models/interfaces/option.interface';
	import { classes } from '$lib/utils';
	import { tippyHint } from '$lib/utils/tippy';
	import {
		Switch,
		SwitchDescription,
		SwitchGroup,
		SwitchLabel,
	} from '@rgossiaux/svelte-headlessui';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { getValue } from 'felte';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import 'tippy.js/dist/tippy.css';
	import Fa6SolidCircleInfo from '~icons/fa6-solid/circle-info';

	export let field: Field | SelectField;
	export let errors: Record<string, any>;
	export let warnings: Record<string, any>;

	$: {
		field.valid = !getValue(errors, field.name);
		field.errorMessage = getValue(errors, field.name)?.[0];
		field.warnMessage = getValue(warnings, field.name)?.[0];
	}
	const dispatch = createEventDispatcher();

	let options: Option[] = [];
	onMount(async () => {
		if (field instanceof AsyncSelectField) {
			options = await field.getOptions();
		} else if (field instanceof SelectField) {
			options = field.options;
		}
	});
</script>

<div>
	{#if field.type !== 'checkbox'}
		<div class="flex items-center gap-2">
			<label for={field.name} class="text-sm font-medium text-gray-700">
				{field.label}
				{#if field.required}
					<span class="text-red-600">*</span>
				{/if}
			</label>
			{#if field.hint}
				<div use:tippyHint={{ content: field.hint }}>
					<Fa6SolidCircleInfo
						class="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
					/>
				</div>
			{/if}
		</div>
	{/if}
	{#if field.name === 'area'}
		<SelectArea
			id={field.name}
			value={field.value}
			invalidText={field.errorMessage}
			on:select
			on:clear
		/>
	{:else if field instanceof SelectField || field instanceof AsyncSelectField}
		<Select id={field.name} bind:current={field.value} {options} on:select />
	{:else if field.type === 'checkbox'}
		<SwitchGroup class="flex items-center justify-between">
			<span class="flex flex-grow flex-col">
				<SwitchLabel
					as="span"
					class="text-sm font-medium text-gray-700"
					passive
				>
					{field.name === 'deactivated'
						? 'Deactivated'
						: field.name === 'notify'
						? 'Auto payment reminders'
						: field.name === 'isPaid'
						? 'Paid?'
						: ''}
				</SwitchLabel>
				<SwitchDescription as="span" class="text-sm text-gray-500">
					{field.name === 'deactivated'
						? 'TRUE: Payments cannot be paid. FALSE: Rent payments are enabled.'
						: field.name === 'notify'
						? 'Enable to send payment reminders automatically.'
						: field.name === 'isPaid'
						? 'Whether this transaction has already been paid or not.'
						: ''}
				</SwitchDescription>
			</span>
			<Switch
				checked={!!field.value}
				let:checked
				on:change={(e) => {
					field.value = e.detail;
					dispatch('select', {
						value: e.detail,
					});
				}}
				class={classes(
					field.value ? 'bg-indigo-600' : 'bg-gray-200',
					'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
				)}
			>
				<span
					aria-hidden="true"
					class={classes(
						checked ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
					)}
				/>
			</Switch>
		</SwitchGroup>
	{:else}
		<div class="relative mt-1 rounded-md">
			<input
				type={field.type}
				name={field.name}
				value={field.value || ''}
				id={field.name}
				class="form__input"
				disabled={field.name === 'id' ||
					field.name === 'createdAt' ||
					field.name === 'updatedAt'}
				class:form__input--invalid={!field.valid}
				class:form__input--warn={field.warnMessage}
			/>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
			>
				{#if !field.valid && field.type !== 'date'}
					<Icon
						src={ExclamationCircle}
						class="h-5 w-5 text-red-500"
						aria-hidden="true"
					/>
				{/if}
				{#if field.warnMessage && field.type !== 'date'}
					<Icon
						src={ExclamationCircle}
						class="h-5 w-5 text-yellow-500"
						aria-hidden="true"
					/>
				{/if}
			</div>
		</div>
	{/if}
	{#if !field.valid}
		<p class="mt-2 text-sm text-red-600" id={`${field.name}-error`}>
			{field.errorMessage ?? ''}
		</p>
	{/if}
	{#if field.warnMessage}
		<p class="mt-2 text-sm text-yellow-600" id={`${field.name}-warning`}>
			{field.warnMessage ?? ''}
		</p>
	{/if}
</div>

<style lang="postcss">
	.form__input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
	.form__input--invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
	.form__input--warn {
		@apply border-yellow-500 text-yellow-600 focus:invalid:border-yellow-500 focus:invalid:ring-yellow-500;
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
