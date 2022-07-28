<script lang="ts">
	import { dev } from '$app/env';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/buttons/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import SelectEntity from '$lib/components/form/inputs/SelectEntity.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import type { Field, SelectField } from '$lib/models/classes/Field.class';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { addToast } from '$lib/stores/toast';
	import { validator } from '@felte/validator-zod';
	import { ResponseError } from '@self/sdk';
	import { createForm } from 'felte';
	import type { ZodSchema } from 'zod';

	export let schema: ZodSchema;
	export let entityTitle: EntityTitle;
	export let basicFields: Field[];
	export let relationalFields: SelectField[] = [];
	export let formType: 'create' | 'update';
	export let onCreate: (values: any) => Promise<{ id: string }>;
	export let onUpdate: (values: any) => Promise<{ id: string }>;
	export let onSuccess: (value: any) => Promise<void> = (value) =>
		goto(`/${entityNameMap[entityTitle].urlName}/${value.id}`);

	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	// Manually pass initialValues for fields that do not use the `name` attribute.
	const initialValues = [...basicFields, ...relationalFields].reduce<
		Record<string, any>
	>((acc, field) => {
		if (field.autoInit) {
			acc[field.name] = field.value;
		}
		return acc;
	}, {});

	const {
		form,
		errors,
		warnings,
		isSubmitting,
		data: data2,
		setData,
		isValid,
	} = createForm({
		schema,

		...(initialValues && { initialValues }), // for fields that do not use the `name` attribute.

		extend: validator({ schema }),

		onSubmit: async (original) => {
			console.debug({ originalFormValues: original });
			const values = schema.passthrough().parse(original); // let zod handle date parsing ("" to null)
			console.debug({ parsedFormValues: values });
			let value: any;
			if (formType === 'update') {
				value = await onUpdate(values);
			} else {
				value = await onCreate(values);
			}

			onSuccess(value);
		},

		onError: async (error: any) => {
			let message = '';
			if (error instanceof ResponseError) {
				const data = await error.response.json();
				console.error(data);
				message = data.message;
			}
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
					subtitle: message,
				},
			});
		},
	});
</script>

<div class="mx-auto h-full py-8 sm:w-[500px]">
	<form
		use:form
		class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
		data-test={$isValid ? 'ok' : 'error'}
	>
		<div class="flex flex-col justify-between">
			<div class="divide-y divide-gray-200 px-4 sm:px-6">
				<h1 class="py-4 text-lg font-medium text-gray-700">
					{formType === 'update' ? 'Edit ' : 'New '}{entityNameMap[entityTitle]
						.singularCap}
				</h1>
				<div class="space-y-6 pt-6 pb-5">
					<SelectEntity
						fields={relationalFields}
						errors={$errors}
						on:select={(e) => {
							setData(e.detail.name, e.detail.value);
						}}
					/>
					{#each basicFields as field}
						<Input
							{field}
							errors={$errors}
							warnings={$warnings}
							on:select={(e) => {
								setData(field.name, e.detail.value);
							}}
							on:clear={() => {
								setData(field.name, '');
							}}
						/>
					{/each}
				</div>
			</div>
		</div>
		<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
			<Button
				text={formType === 'update' ? 'Save changes' : 'Create new'}
				disabled={!noErrorMsg || $isSubmitting}
				loading={$isSubmitting}
			/>
		</div>
	</form>
	{#if dev}
		<div class="prose py-6"><pre>{JSON.stringify($data2, null, 2)}</pre></div>
		<div class="prose py-6"><pre>{JSON.stringify($errors, null, 2)}</pre></div>
		<div class="prose py-6">
			<pre>{JSON.stringify($warnings, null, 2)}</pre>
		</div>
	{/if}
</div>
