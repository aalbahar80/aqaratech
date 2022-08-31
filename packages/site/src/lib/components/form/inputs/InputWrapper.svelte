<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';

	import type { Field, SelectField } from '$lib/models/classes/Field.class';

	export let field: Field | SelectField;
</script>

<div>
	<div class="flex items-center gap-2">
		<label for={field.name} class="text-sm font-medium text-gray-700">
			{field.label}
			{#if field.required}
				<span class="text-red-600">*</span>
			{/if}
		</label>
		{#if field.hint}
			<div class="mr-1.5">
				<Tooltip text={field.hint} />
			</div>
		{/if}
	</div>
	<slot />
</div>
