<script lang="ts">
	import { enhance } from '$app/forms';
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import type { FormModel } from '$lib/components/form/form-model';
	import { objectValues } from '$lib/utils/common';

	type FormKeys = $$Generic<string>;
	type WithUnkownValues<T extends string> = {
		[K in T as FormKeys]: unknown;
	};

	// type FieldErrors<T extends string> = { [K in T]?: string[] };
	type FieldErrors<T extends string> = Record<T, string[]>;
	type ActualFormKeys<T extends string> = Exclude<T, 'errors'>;

	interface FormErrors<T extends string> {
		errors?: {
			formErrors: string[];
			fieldErrors: FieldErrors<T>;
		};
	}

	export let form:
		| Partial<
				WithUnkownValues<ActualFormKeys<FormKeys>> &
					FormErrors<ActualFormKeys<FormKeys>>
		  >
		| undefined;

	// export let data: WithUnkownValues<ActualFormKeys<FormKeys>> | undefined =
	// 	undefined;
	export let data:
		| {
				[K in ActualFormKeys<FormKeys>]: unknown;
		  }
		| undefined = undefined;

	export let formModel: FormModel<
		Omit<WithUnkownValues<ActualFormKeys<FormKeys>>, 'errors'>
	>;
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
