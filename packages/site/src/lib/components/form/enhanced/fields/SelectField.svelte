<script lang="ts">
	import FieldLabel from '$lib/components/form/enhanced/fields/FieldLabel.svelte';
	import Select from '$lib/components/form/inputs/Select.svelte';
	import type { SelectFormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;
	type GFormField = $$Generic<SelectFormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;

	$: options =
		'getOptions' in formField ? formField.getOptions() : formField.options;
</script>

<FieldLabel {formField} />

<Select id={formField.name} {options} current={value} />
