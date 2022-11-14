<script lang="ts">
	import ComboboxField from '$lib/components/form/enhanced/fields/ComboboxField.svelte';
	import FieldError from '$lib/components/form/enhanced/fields/FieldError.svelte';
	import Input from '$lib/components/form/enhanced/fields/Input.svelte';
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
		<Input {formField} {value} {errors} />
	{/if}
</div>

<FieldError {errors} />
