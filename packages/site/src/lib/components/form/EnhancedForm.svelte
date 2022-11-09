<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import type { FormModel } from '$lib/components/form/form-model';
	import { objectValues } from '$lib/utils/common';

	interface FormErrors {
		errors?: {
			formErrors: string[];
			fieldErrors: Record<string, string[]>;
		};
	}

	type Concrete<Type> = {
		[Property in keyof Type]-?: Type[Property];
	};

	// type K = $$Generic;
	type FormValues = $$Generic<Record<string, unknown>>;
	// type FormValues = $$Generic<undefined | (Record<keyof T, unknown> & FormErrors)>;

	export let form: (FormValues & FormErrors) | undefined;
	export let data: FormValues | undefined = undefined;
	export let formModel: FormModel<FormValues>;
</script>

<form
	method="POST"
	use:enhance
	class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
>
	<Fields>
		{#each objectValues(formModel.fields) as formField}
			{@const valueFromForm = form?.[formField.name]}
			{@const valueFromData = data?.[formField.name]}
			<!-- valueFromForm is the value as it is being edited. Always prioritize it unless it's `undefined`. -->
			<Field
				{formField}
				value={valueFromForm === undefined ? valueFromData : valueFromForm}
				errors={form?.errors?.fieldErrors[formField.name]}
			/>
		{/each}
	</Fields>

	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<button>Save</button>
	</div>
</form>
