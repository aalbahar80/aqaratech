<script lang="ts">
	import type { FormField } from '$lib/components/form/model/form-field.interface';

	import CheckboxNative from '$lib/components/form/enhanced/fields/CheckboxNative.svelte';
	import ComboboxField from '$lib/components/form/enhanced/fields/ComboboxField.svelte';
	import FieldError from '$lib/components/form/enhanced/fields/FieldError.svelte';
	import Input from '$lib/components/form/enhanced/fields/Input.svelte';
	import SelectField from '$lib/components/form/enhanced/fields/SelectField.svelte';
	import SelectTenant from '$lib/components/form/enhanced/fields/SelectTenant.svelte';

	type Name = $$Generic;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<div>
	{#if formField.name === 'tenantId' && formField.type === 'select'}
		<SelectTenant
			{formField}
			{value}
			{errors}
		/>
	{:else if formField.type === 'select' && formField.combobox}
		<ComboboxField
			{formField}
			{value}
			{errors}
		/>
	{:else if formField.type === 'select'}
		<SelectField
			{formField}
			{value}
		/>
	{:else if formField.type === 'checkbox'}
		<!-- <Checkbox {formField} {value} /> -->
		<CheckboxNative
			{formField}
			{value}
		/>
	{:else}
		<Input
			{formField}
			{value}
			{errors}
		/>
	{/if}
</div>

<FieldError {errors} />
