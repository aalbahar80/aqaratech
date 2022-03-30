<script lang="ts">
	import { areas } from '$lib/config/constants';
	import {
		Switch,
		SwitchDescription,
		SwitchGroup,
		SwitchLabel,
	} from '@rgossiaux/svelte-headlessui';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Fuse from 'fuse.js';
	import startCase from 'lodash-es/startCase.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import Select from 'svelte-select';

	export let name = '';
	export let value: string | Date | null | number | boolean = '';
	export let invalid = false;
	export let invalidText: string | undefined = '';

	let type = 'text';

	const options = {
		includeScore: true,
		keys: ['0', '1'],
	};

	const items = areas.map((area) => ({
		value: area[1],
		label: `${area[0]} | ${area[1]}`,
	}));
	const fuse = new Fuse(areas, options);
	const loadOptions = async (q: string) =>
		fuse.search(q).map((result) => ({
			value: result.item[1],
			label: `${result.item[0]} | ${result.item[1]}`,
		}));

	switch (name) {
		case 'dob':
		case 'end':
		case 'start':
		case 'dueDate':
		case 'postDate':
		case 'residencyEnd':
		case 'completedAt':
			type = 'date';
			if (value instanceof Date) {
				// eslint-disable-next-line prefer-destructuring
				value = value.toISOString().split('T')[0];
				break;
			}
			break;
		case 'createdAt':
		case 'updatedAt':
			type = 'datetime-local';
			if (value instanceof Date) {
				value = value.toISOString();
				// remove timezone
				value = value.substring(0, value.length - 1);
				break;
			}
			console.warn(value, "This case shouldn't happen");
			break;

		case 'monthlyRent':
		case 'marketRent':
		case 'deposit':
		case 'amount':
		case 'size':
		case 'bed':
		case 'bath':
		case 'floor':
			type = 'number';
			break;
		case 'isPaid':
		case 'active':
		case 'shouldNotify':
			type = 'checkbox';
			break;
		case 'status':
			type = 'select';
			break;
		case 'email':
			type = 'email';
			break;
		default:
			type = 'text';
			break;
	}
	const dispatch = createEventDispatcher();
	onMount(() => {
		// this creates the field in Felte's data store (non-native input elements)
		dispatch('select', {
			value,
		});
	});
	function classes(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<div>
	{#if type !== 'checkbox'}
		<label for={name} class="text-sm font-medium text-gray-700">
			{startCase(name)}
		</label>
	{/if}
	{#if name === 'area'}
		<Select
			id={name}
			{items}
			value={value ? { value, label: value } : null}
			hasError={Boolean(invalidText)}
			{loadOptions}
			placeholder="Type to search in English or Arabic..."
			on:select
			on:clear
		/>
	{:else if type === 'select'}
		<Select
			id={name}
			items={name === 'status'
				? ['pending', 'completed', 'cancelled']
				: ['sms', 'email']}
			value={value ? { value, label: value } : null}
			hasError={Boolean(invalidText)}
			on:select
			on:clear
		/>
	{:else if type === 'checkbox'}
		<SwitchGroup class="flex items-center justify-between">
			<span class="flex flex-grow flex-col">
				<SwitchLabel
					as="span"
					class="text-sm font-medium text-gray-700"
					passive
				>
					{name === 'active'
						? 'Active'
						: name === 'shouldNotify'
						? 'Auto payment reminders'
						: name === 'isPaid'
						? 'Paid?'
						: ''}
				</SwitchLabel>
				<SwitchDescription as="span" class="text-sm text-gray-500">
					{name === 'active'
						? 'Active leases generate transactions automatically. You can activate later.'
						: name === 'shouldNotify'
						? 'Enable to send payment reminders automatically.'
						: name === 'isPaid'
						? 'Whether this transaction has already been paid or not.'
						: ''}
				</SwitchDescription>
			</span>
			<Switch
				checked={!!value}
				let:checked
				on:change={(e) => {
					value = e.detail;
					dispatch('select', {
						value: e.detail,
					});
				}}
				class={classes(
					value ? 'bg-indigo-600' : 'bg-gray-200',
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
				{type}
				{name}
				{value}
				id={name}
				class="form__input"
				disabled={name === 'id' || name === 'createdAt' || name === 'updatedAt'}
				class:form__input--invalid={invalid}
			/>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
			>
				{#if invalid && type !== 'date'}
					<Icon
						src={ExclamationCircle}
						class="h-5 w-5 text-red-500"
						aria-hidden="true"
					/>
				{/if}
			</div>
		</div>
	{/if}
	{#if invalid}
		<p class="mt-2 text-sm text-red-600" id={`${name}-error`}>
			{invalidText ?? ''}
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
