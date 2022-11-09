<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import type { FormModel } from '$lib/components/form/form-model';
	import { objectValues } from '$lib/utils/common';

	// @ts-expect-error ts doesn't think this is being used
	interface FormErrors {
		errors?: {
			formErrors: string[];
			fieldErrors: Record<string, string[]>;
		};
	}

	type FormValues<T> = {
		[key in keyof T]: unknown;
	};

	type T = $$Generic<undefined | (Record<string, unknown> & FormErrors)>;
	type K = $$Generic;

	export let form: T;
	export let data: Omit<FormValues<T>, 'errors'> | undefined = undefined;
	export let formModel: FormModel<K>;
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
