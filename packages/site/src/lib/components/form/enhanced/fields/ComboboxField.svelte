<script lang="ts">
	import FieldLabel from '$lib/components/form/enhanced/fields/FieldLabel.svelte';
	import Combobox from '$lib/components/form/inputs/Combobox.svelte';
	import type { SelectFormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;
	type GFormField = $$Generic<SelectFormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<FieldLabel {formField} />

<Combobox
	initialValue={formField.options.find((option) => option.value === value)
		?.value}
	inputId={formField.name}
	options={formField.options}
	invalid={!!errors}
	on:select={(e) => {
		value = e.detail.value;
	}}
	on:filter
/>

<!-- hidden input to make combox compatible with enhanced form -->
<input type="hidden" name={formField.name} {value} />
