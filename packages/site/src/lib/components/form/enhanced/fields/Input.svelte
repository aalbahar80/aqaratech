<script lang="ts">
	import FieldLabel from '$lib/components/form/enhanced/fields/FieldLabel.svelte';

	import type { FormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;

	const parse = (value: unknown) => {
		if (formField.type === 'date' && typeof value === 'string') {
			// format ISO date string to short format YYYY-MM-DD
			return value.substring(0, 10);
		} else {
			return value ?? '';
		}
	};
</script>

<FieldLabel {formField} />

<div class="mt-1">
	<input
		type={formField.type}
		name={formField.name}
		id={formField.name}
		value={parse(value)}
		class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		placeholder={formField.placeholder}
		aria-describedby={formField.hintId}
		class:invalid={errors}
	/>
</div>

<style lang="postcss">
	input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}

	.invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}
</style>
