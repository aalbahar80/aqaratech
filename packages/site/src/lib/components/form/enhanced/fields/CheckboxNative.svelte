<script lang="ts">
	import type { FormField } from '$lib/components/form/model/form-field.interface';
	import Tooltip from '$lib/components/Tooltip.svelte';

	type Name = $$Generic<string>;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown;

	$: checked = typeof value === 'boolean' ? value : false; // Type hack
</script>

<!-- input type=checkbox is not consistent with other HTML inputs. Value will
be sent to server as either a. string "on" or b. nothing at all
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox#attr-value
-->

<!-- eslint-disable @typescript-eslint/restrict-template-expressions -->

<div class="relative flex items-start">
	<div class="flex h-5 items-center">
		<input
			id={formField.name}
			name={formField.name}
			aria-describedby={`${formField.name}-description`}
			type="checkbox"
			bind:checked
			class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
		/>
	</div>
	<div class="ml-3 text-sm">
		<div class="flex items-center gap-2">
			<label for={formField.name} class="font-medium text-gray-700">
				{formField.label}
			</label>

			{#if formField.description}
				<div>
					<Tooltip text={formField.description} />
				</div>
			{/if}
		</div>
		<p id={`${formField.name}-description`} class="text-gray-500">
			{formField.hint}
		</p>
	</div>
</div>
