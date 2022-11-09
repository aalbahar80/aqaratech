<script lang="ts">
	import { ResponseError } from '$api/openapi';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import SelectEntity from '$lib/components/form/inputs/SelectEntity.svelte';
	import type { Field, SelectField } from '$lib/models/classes/Field.class';
	import { addToast } from '$lib/stores/toast';
	import { validator } from '@felte/validator-zod';
	import { entitiesMap, getRoute, PageType, type Entity } from '@self/utils';
	import { createForm } from 'felte';
	import type { z, ZodSchema } from 'zod';

	type Schema = $$Generic<z.ZodTypeAny>;
	type Submitted = $$Generic<string | { id: string } | Record<string, any>>;

	export let formType: 'create' | 'update';
	export let schema: Schema;
	export let warnSchema: ZodSchema | undefined = undefined;
	export let entity: Entity;
	export let basicFields: Field[];
	export let relationalFields: SelectField[] = [];
	export let onSubmit: (values: z.infer<Schema>) => Promise<Submitted>;
	export let onSuccess: (value: Submitted) => Promise<void> = (value) => {
		let id = '';
		if (typeof value === 'string') {
			id = value;
		} else if ('id' in value) {
			id = value.id;
		}

		const url = getRoute({
			entity,
			id,
			pageType: PageType.Id,
			params: $page.params,
		});

		return goto(url);
	};

	// $: noErrorMsg = Object.values($errors).every((e) => e === null);

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

		extend: [
			validator({ schema }),
			...(warnSchema
				? [validator({ schema: warnSchema, level: 'warning' })]
				: []),
		],

		onSubmit: async (original) => {
			const value = await onSubmit(original);
			await onSuccess(value);
		},

		onError: async (error: any) => {
			let message = '';
			console.error(error);
			if (error instanceof ResponseError) {
				const data = await error.response.json();
				console.error(data);
				message = data.message;
			}
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
					subtitle: message || 'See console for more details.',
				},
			});
		},
	});
</script>

<div class="mx-auto py-8 sm:w-[500px]">
	<form
		use:form
		class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
		data-test={$isValid ? 'ok' : 'error'}
	>
		<div class="flex flex-col justify-between">
			<div class="divide-y divide-gray-200 px-4 sm:px-6">
				<h1 class="py-4 text-lg font-medium text-gray-700">
					{formType === 'update' ? 'Edit ' : 'Add '}{entitiesMap[entity]
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
			<Button text="Save" disabled={$isSubmitting} loading={$isSubmitting} />
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
