<script lang="ts">
	import * as R from 'remeda';

	import DebugPane from '$lib/components/form/DebugPane.svelte';
	import FormError from '$lib/components/form/enhanced/fields/FormError.svelte';
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import { addErrorToast, addSuccessToast } from '$lib/stores/toast';
	import { objectValues } from '$lib/utils/common';

	import type { FormPageModel } from '$lib/components/form/model/form-field.interface';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	// Types

	type T = $$Generic;
	type FPM = $$Generic<FormPageModel<T>>;

	export let form: FPM['actionData'];
	export let formModel: {
		fields: FPM['fields'];
	};
	export let data: FPM['data'] = undefined;

	$: formType =
		$page.url.pathname.split('/').slice(-1)[0] === 'edit' ? 'edit' : 'new';

	$: fields = R.omitBy(formModel.fields, (field) => {
		// omit fields based on formType
		const hide =
			(formType === 'edit' && field.hideWhenEdit) ||
			(formType === 'create' && field.hideWhenCreate);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return hide;
	});
</script>

<form
	method="POST"
	class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
	use:enhance={() => {
		return ({ result, update }) => {
			if (result.type === 'failure') {
				addErrorToast('Invalid form');
			} else if (result.type === 'success' || result.type === 'redirect') {
				addSuccessToast();
			}

			update();
		};
	}}
>
	<FormError errors={form?.errors.formErrors} />
	<Fields>
		{#each objectValues(fields) as formField}
			<!-- If check here is only for typing purposes -->
			{#if formField}
				{@const valueFromForm = form?.[formField.name]}
				{@const valueFromData = data?.[formField.name]}
				<!-- valueFromForm is the value as it is being edited. Always prioritize it unless it's `undefined`. -->
				<Field
					{formField}
					value={valueFromForm === undefined ? valueFromData : valueFromForm}
					errors={form?.errors?.fieldErrors?.[formField.name]}
				/>
			{/if}
		{/each}
	</Fields>

	<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
		<button>Save</button>
	</div>
</form>

<DebugPane data={form} />
