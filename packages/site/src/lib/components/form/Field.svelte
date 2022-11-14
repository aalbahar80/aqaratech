<script lang="ts">
	import ComboboxField from '$lib/components/form/enhanced/fields/ComboboxField.svelte';
	import FieldError from '$lib/components/form/enhanced/fields/FieldError.svelte';
	import type { FormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<div>
	<div class="flex justify-between">
		<label for={formField.name} class="block text-sm font-medium text-gray-700"
			>{formField.label}</label
		>
		<span class="text-sm text-gray-500" id={formField.hintId}
			>{formField.hint}</span
		>
	</div>

	{#if formField.type === 'select' && formField.combobox}
		<ComboboxField {formField} {value} {errors} />
	{:else}
		<div class="mt-1">
			<input
				type={formField.type}
				name={formField.name}
				id={formField.name}
				value={value ?? ''}
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				placeholder={formField.placeholder}
				aria-describedby={formField.hintId}
				class:invalid={errors}
			/>
		</div>
	{/if}
</div>

<FieldError {errors} />

<style lang="postcss">
	input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}

	.invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
