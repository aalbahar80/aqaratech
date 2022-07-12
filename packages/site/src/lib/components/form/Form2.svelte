<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import type { Field } from '$lib/models/classes/Field.class';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { createForm } from 'felte';
	import type { ZodSchema } from 'zod';

	export let schema: ZodSchema;
	export let entityTitle: EntityTitle;
	export let basicFields: Field[];
	export let type: 'create' | 'update';
	export let onCreate: (values: any) => Promise<void>;
	export let onUpdate: (values: any) => Promise<void>;

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
		onSubmit: async (values) => {
			console.log({ values }, 'Form2.svelte ~ 25');
			if (type === 'update') {
				await onCreate(values);
			} else if (type === 'create') {
				await onUpdate(values);
			}
		},
	});
</script>

<form use:form>
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
</form>
