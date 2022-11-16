<script lang="ts">
	import type { FormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic;

	export let formField: FormField<Name>;
</script>

<div class="flex justify-between">
	<label for={formField.name} class="block text-sm font-medium text-gray-700">
		{formField.label}

		{#if formField.required}
			<span class="text-red-600">*</span>
		{/if}
	</label>
	<span class="text-sm text-gray-500" id={formField.hintId}
		>{formField.hint}</span
	>
</div>
