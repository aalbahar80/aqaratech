<script lang="ts">
	import type { SelectFormField } from '$lib/components/form/model/form-field.interface';

	import FieldLabel from '$lib/components/form/enhanced/fields/FieldLabel.svelte';
	import Select from '$lib/components/form/inputs/Select.svelte';

	type Name = $$Generic;
	type GFormField = $$Generic<SelectFormField<Name>>;

	export let formField: GFormField;
	export let value: unknown = undefined;
</script>

<FieldLabel {formField} />

<Select id={formField.name} options={formField.options} current={value} />
