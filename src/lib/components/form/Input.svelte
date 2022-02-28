<script lang="ts">
	import { areas } from '$lib/config/constants';
	import assertNever from '$lib/utils/table-utils';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import Fuse from 'fuse.js';
	import startCase from 'lodash-es/startCase.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import Select from 'svelte-select';

	export let name: string = '';
	export let value: string | Date | null | number = '';
	export let invalid = false;
	export let invalidText: string = '';

	let type: string = 'text';

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
		case 'endDate':
		case 'startDate':
		case 'dueDate':
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
			assertNever(value, "This case shouldn't happen");

		case 'monthlyRent':
		case 'marketRent':
		case 'deposit':
		case 'amount':
		case 'size':
		case 'bed':
		case 'bath':
			type = 'number';
			break;
		case 'isPaid':
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
		// this creates the field in Felte's data store
		dispatch('select', {
			value,
		});
	});
</script>

<div>
	<label for={name} class="text-sm font-medium text-gray-700">
		{startCase(name)}
	</label>
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
			items={['pending', 'completed', 'cancelled']}
			value={value ? { value, label: value } : null}
			hasError={Boolean(invalidText)}
			on:select
			on:clear
		/>
	{:else if type === 'checkbox'}
		<span>
			<input
				class="rounded border-gray-300 ml-4 h-5 w-5 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
				type="checkbox"
				checked={!!value}
				{name}
				id={name}
				class:form__input--invalid={invalid}
			/>
		</span>
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
			{invalidText}
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
