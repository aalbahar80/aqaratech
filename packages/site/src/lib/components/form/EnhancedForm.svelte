<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import type { FormModel } from '$lib/components/form/form-model';
	import { objectValues } from '$lib/utils/common';

	type ActionDataKeys = $$Generic<string>;
	type FormKeys = Exclude<ActionDataKeys, 'errors'>;
	// type Form = { [key in FormKeys]: FormKeys[key] };
	type ActionDataObj =
		| Partial<WithUnkownValues<FormKeys>> & FormErrors<FormKeys>;

	type Data =
		| {
				[key in FormKeys]: unknown;
		  };

	type WithUnkownValues<T extends string> = {
		[K in T as ActionDataKeys]: unknown;
	};

	type FieldErrors<T extends string> = Record<T, string[]>;

	interface FormErrors<T extends string> {
		errors?: {
			formErrors: string[];
			fieldErrors: FieldErrors<T>;
		};
	}

	export let form: ActionDataObj | undefined;

	export let data: Data | undefined = undefined;

	export let formModel: FormModel<{
		[K in FormKeys]: unknown;
	}>;
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
