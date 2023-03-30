<script lang="ts">
	import * as R from 'remeda';
	import toast from 'svelte-french-toast';

	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	import type { FormPageModel } from '$lib/components/form/model/form-field.interface';

	import L from '$i18n/i18n-svelte';
	import FormError from '$lib/components/form/enhanced/fields/FormError.svelte';
	import Field from '$lib/components/form/Field.svelte';
	import Fields from '$lib/components/form/Fields.svelte';
	import { objectValues } from '$lib/utils/common';

	// Types

	type T = $$Generic;
	type FPM = $$Generic<FormPageModel<T>>;

	export let form: FPM['actionData'];
	export let formModel: {
		fields: FPM['fields'];
	};
	export let data: FPM['data'] = undefined;

	$: formType =
		$page.url.pathname.split('/').slice(-1)[0] === 'edit' ? 'edit' : 'create';

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
	class="flex h-full flex-col gap-y-4 divide-gray-200 rounded-md bg-white px-4 shadow sm:px-6"
	use:enhance={() => {
		const toastId = toast.loading('Loading...');

		// eslint-disable-next-line @typescript-eslint/require-await
		return async ({ result, update }) => {
			if (result.type === 'failure') {
				toast.error('Invalid form', {
					id: toastId,
				});
			} else if (result.type === 'success' || result.type === 'redirect') {
				toast.success('Success', {
					id: toastId,
				});
			} else if (result.type === 'error') {
				toast.error('Error', {
					id: toastId,
				});
			} else {
				// Case not expected. Dismiss toast nonetheless.
				toast.dismiss(toastId);
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
				{@const valueFromData = formField.getValue
					? formField.getValue(data)
					: data?.[formField.name]}
				<!-- valueFromForm is the value as it is being edited. Always prioritize it unless it's `undefined`. -->
				<Field
					{formField}
					value={valueFromForm === undefined ? valueFromData : valueFromForm}
					errors={form?.errors?.fieldErrors?.[formField.name]}
				/>
			{/if}
		{/each}
	</Fields>

	<!-- Divider -->
	<div class="border-t border-gray-200" />

	<div class="flex flex-shrink-0 justify-end space-x-4 py-4 text-lg">
		<button class="rounded bg-gray-500 px-5 py-1 text-white"
			>{$L.buttons.save()}</button
		>
	</div>
</form>
