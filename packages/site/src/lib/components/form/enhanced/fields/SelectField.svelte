<script lang="ts">
	import FieldLabel from '$lib/components/form/enhanced/fields/FieldLabel.svelte';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import type { SelectFormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;
	type GFormField = $$Generic<SelectFormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<FieldLabel {formField} />

<Select
	id={formField.name}
	options={formField.options}
	current={value}
	on:select={(e) => {
		value = e.detail.value;
	}}
/>

<!-- hidden input to make select compatible with enhanced form -->
<input type="hidden" name={formField.name} {value} />
