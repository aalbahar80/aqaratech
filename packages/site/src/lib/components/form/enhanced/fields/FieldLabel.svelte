<script lang="ts">
	import type { FormField } from '$lib/components/form/model/form-field.interface';

	import Tooltip from '$lib/components/Tooltip.svelte';

	type Name = $$Generic;

	export let formField: FormField<Name>;
</script>

<div class="flex justify-between">
	<div class="flex items-center gap-2">
		<div class="block text-sm font-medium text-gray-700">
			<label for={formField.name}>
				{formField.label}
			</label>

			<!-- Leave the asterisk out of the label to simplify testing locators -->
			{#if formField.required}
				<span
					class="text-red-600"
					aria-hidden="true">*</span
				>
			{/if}
		</div>

		{#if formField.hint}
			<div class="mr-1.5">
				<Tooltip text={formField.hint} />
			</div>
		{/if}
	</div>
	<!-- <span class="text-sm text-gray-500" id={formField.hintId}>
			{formField.hint}
		</span> -->
</div>
