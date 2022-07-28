<script lang="ts">
	import type { Field, SelectField } from '$lib/models/classes/Field.class';
	import { tippyHint } from '$lib/utils/tippy';
	import 'tippy.js/dist/tippy.css';
	import Fa6SolidCircleInfo from '~icons/fa6-solid/circle-info';

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
			<div use:tippyHint={{ content: field.hint }}>
				<Fa6SolidCircleInfo
					class="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
				/>
			</div>
		{/if}
	</div>
	<slot />
</div>
