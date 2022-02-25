<script lang="ts">
	import assertNever from '$lib/utils/table-utils';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import startCase from 'lodash-es/startCase.js';
	import Select from 'svelte-select';

	export let name: string = '';
	export let value: string | Date | null | number = '';
	export let invalid = false;
	export let invalidText: string = '';

	let type: string = 'text';

	switch (name) {
		case 'dob':
		case 'endDate':
		case 'startDate':
		case 'dueDate':
			type = 'date';
			if (value instanceof Date) {
				// 'Create' form gets a Date object
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
		default:
			type = 'text';
			break;
	}
</script>

{#if type === 'select'}
	<div>
		<Select
			id={name}
			{name}
			items={['Pending', 'Completed', 'Cancelled']}
			hasError={Boolean(invalidText)}
		/>
	</div>
{/if}

<div>
	{#if type === 'checkbox'}
		<div class="inline-flex space-x-4">
			<input
				class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0"
				{type}
				{name}
				{value}
				id={name}
				disabled={name === 'id' || name === 'createdAt' || name === 'updatedAt'}
				class:form__input--invalid={invalid}
			/>
			<label for={name} class="block text-sm font-medium text-gray-700">
				{startCase(name)}
			</label>
		</div>
	{:else}
		<label for={name} class="block text-sm font-medium text-gray-700">
			{startCase(name)}
		</label>
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
