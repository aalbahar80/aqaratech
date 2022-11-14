<script lang="ts">
	import Combobox from '$lib/components/form/inputs/Combobox.svelte';
	import type { SelectFormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;
	type GFormField = $$Generic<SelectFormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
	export let errors: string[] | undefined = undefined;
</script>

<Combobox
	initialValue={formField.options.find((option) => option.value === value)
		?.value}
	inputId={formField.name}
	options={formField.options}
	invalid={!!errors}
	on:select={(e) => {
		value = e.detail.value;
	}}
/>

<!-- hidden input to make combox compatible with enhanced form -->
<input type="hidden" name={formField.name} {value} />
