<script lang="ts">
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import startCase from 'lodash-es/startCase.js';

	export let name: string = '';
	export let value: string | Date = '';
	export let invalid = false;
	export let invalidText: string = '';

	let type: string = 'text';

	switch (name) {
		case 'dob':
		case 'endDate':
		case 'startDate':
			type = 'date';
			if (value instanceof Date) {
				// 'Create' form gets a Date object
				// eslint-disable-next-line prefer-destructuring
				value = value.toISOString().split('T')[0];
			}
			// 'Edit' form gets an ISO string
			value = value?.substring(0, 10);

			break;
		case 'monthlyRent':
		case 'deposit':
		case 'size':
		case 'bed':
		case 'bath':
			type = 'number';
			break;
		default:
			type = 'text';
			break;
	}
</script>

<div>
	<label for={name} class="block text-sm font-medium text-gray-900">
		{startCase(name)}
	</label>
	<div class="relative mt-1 rounded-md shadow-sm">
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
