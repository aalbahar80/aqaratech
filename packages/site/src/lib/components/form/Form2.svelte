<script lang="ts">
	import { dev } from '$app/env';
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { entityNameMap } from '$lib/constants/names';
	import type { Field } from '$lib/models/classes/Field.class';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { addErrorToast } from '$lib/stores/toast';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import type { ZodSchema } from 'zod';

	export let schema: ZodSchema;
	export let entityTitle: EntityTitle;
	export let basicFields: Field[];
	export let formType: 'create' | 'update';
	export let onCreate: (values: any) => Promise<void>;
	export let onUpdate: (values: any) => Promise<void>;

	$: noErrorMsg = Object.values($errors).every((e) => e === null);

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

		extend: validator({ schema }),

		onSubmit: async (original) => {
			console.log({ original }, 'Form2.svelte ~ 36');
			const values = schema.parse(original); // let zod handle date parsing ("" to null)
			console.log({ values }, 'Form2.svelte ~ 25');
			if (formType === 'update') {
				await onUpdate(values);
			} else if (formType === 'create') {
				await onCreate(values);
			}
		},

		onError: (err: any) => {
			// TODO format/parse server error message
			addErrorToast();
			console.error(err);
			return err;
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
