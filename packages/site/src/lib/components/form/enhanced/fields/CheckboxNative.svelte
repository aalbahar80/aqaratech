<script lang="ts">
	import type { FormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown;

	if (typeof formField.name === 'bigint') {
		console.log(formField.name);
	}
</script>

<!-- <input type=checkbox /> is not consistent with other HTML inputs -->
<!-- value will be sent to server as either a. string "on" or b. nothing at all -->
<!-- Read: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#attr-value -->
<label>
	<input type="checkbox" name={formField.name} bind:checked={value} />
	{formField.label}
</label>
