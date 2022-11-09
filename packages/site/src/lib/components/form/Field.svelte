<script lang="ts">
	import type { FormField } from '$lib/components/form/form-field';
	import { ExclamationCircle } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Writable } from 'svelte/store';
	import type { ActionData } from './$types';

	type Errors = NonNullable<ActionData>['errors'] | undefined;

	export let formField: FormField;
	export let value: unknown = undefined;
	export let errors: Writable<Errors> | undefined;

	const hasErrors = (name: string): name is keyof Writable<Errors> => {
		return (
			errors &&
			$errors &&
			formField.name in $errors &&
			$errors[formField.name] &&
			$errors[formField.name].length > 0
		);
	};
</script>

<!-- Input 1 -->
<div>
	<div class="flex justify-between">
		<label for={formField.name} class="block text-sm font-medium text-gray-700"
			>{formField.label}</label
		>
		<span class="text-sm text-gray-500" id={formField.hintId}
			>{formField.hint}</span
		>
	</div>
	<div class="mt-1">
		<input
			type={formField.type}
			name={formField.name}
			id={formField.name}
			class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
			placeholder={formField.placeholder}
			aria-describedby={formField.hintId}
		/>
	</div>
</div>

<!-- Input 2 -->
<div class="relative mt-1 rounded-md">
	<input
		name={formField.name}
		type={formField.type}
		value={value ?? ''}
		class="form__input"
		class:invalid={hasErrors(formField.name)}
	/>
	<div
		class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
	>
		{#if hasErrors(formField.name) && formField.type !== 'date'}
			<Icon
				src={ExclamationCircle}
				class="h-5 w-5 text-red-500"
				aria-hidden="true"
			/>
		{/if}
	</div>
</div>

{#if hasErrors(formField.name)}
	{#each $errors?.[formField.name] as error}
		<p class="mt-2 text-sm text-red-600">
			{error ?? ''}
		</p>
	{/each}
{/if}

<style lang="postcss">
	input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}

	.invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
