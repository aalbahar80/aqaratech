<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import type { FormModel } from '$lib/components/form/form-model';
	import { objectValues } from '$lib/utils/common';

	type T = $$Generic;

	interface FormErrors {
		errors: {
			formErrors: string[];
			fieldErrors: Record<string, [string, ...string[]]>;
		};
	}

	type Form = null | (Record<string, unknown> & FormErrors);

	export let form: Form;
	export let formModel: FormModel<T>;
</script>

<form
	method="POST"
	use:enhance
	class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
>
	<Fields>
		{#each objectValues(formModel.fields) as formField}
			<Field
				{formField}
				value={form?.[formField.name]}
				errors={form?.errors.fieldErrors[formField.name]}
			/>
		{/each}
	</Fields>

	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<button>Save</button>
	</div>
</form>
