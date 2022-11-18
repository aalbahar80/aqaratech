<script lang="ts">
	import type { FormField } from '$lib/components/form/model/form-field.interface';

	type Name = $$Generic<string>;
	type GFormField = $$Generic<FormField<Name>>;

	export let formField: GFormField;
	export let value: unknown;
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
			bind:checked={value}
			class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
		/>
	</div>
	<div class="ml-3 text-sm">
		<label for={formField.name} class="font-medium text-gray-700">
			{formField.label}
		</label>
		<p id={`${formField.name}-description`} class="text-gray-500">
			{formField.hint}
		</p>
	</div>
</div>
