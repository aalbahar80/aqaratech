<script lang="ts">
	import { dev } from '$app/env';
	import { goto } from '$app/navigation';
	import getEditorErrors from '$lib/client/getEditorErrors';
	import trpc from '$lib/client/trpc';
	import SelectEntity from '$lib/components/form/SelectEntity.svelte';
	import { addToast } from '$lib/stores/toast';
	import { forceDateToInput, objectKeys } from '$lib/utils/common';
	import type { Model } from '$models/interfaces/entity.interface';
	import { validateSchema } from '@felte/validator-zod';
	import { TRPCClientError } from '@trpc/client';
	import { createForm, getValue } from 'felte';
	import type { z } from 'zod';
	import Button from '../Button.svelte';
	import AttributeEntity from './AttributeEntity.svelte';
	import Input from './Input.svelte';

	export let model: Model;
	export let data: Partial<z.infer<typeof model.schema>>;

	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setData,
	} = createForm<z.infer<typeof model.schema>>({
		transform: (values) => {
			const original = values as z.infer<typeof model.schema>;
			const dateFields = [
				'dob',
				'end',
				'start',
				'dueAt',
				'postAt',
				'residencyEnd',
				'completedAt',
			];
			objectKeys(original).forEach((key) => {
				if (dateFields.includes(key) && original[key]) {
					original[key] = forceDateToInput(original[key]!);
				}
			});
			return original;
		},
		initialValues: data,
		schema: model.schema,
		validate: validateSchema(model.schema),
		onError: (err: any) => {
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
				},
			});
			if (err instanceof TRPCClientError) {
				const code = err.data.code;
				console.error(code, 'Form.svelte ~ 65');
				const serverErrors = getEditorErrors(err);
				return serverErrors;
			}
			return err;
		},
		onSubmit: async (values) => {
			console.log(values);
			const submitted = await trpc.mutation(`${model.name}:save`, values);
			console.log({ submitted }, 'FormTrpc.svelte ~ 44');
			await goto(`/${model.name}/${submitted.id}`);
			addToast({
				props: {
					kind: 'success',
					title: 'Success',
				},
			});
		},
	});
</script>

<svelte:head>
	<title>{`Edit ${model.singularCap}`}</title>
</svelte:head>

<div class="mx-auto h-full py-8 sm:w-[500px]">
	<form
		use:form
		class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
	>
		<div class="h-0 flex-1">
			<div class="flex flex-col justify-between">
				<div class="divide-y divide-gray-200 px-4 sm:px-6">
					<h1 class="py-4 text-lg font-medium text-gray-700">
						{data?.id ? 'Edit ' : 'New '}{model.singularCap}
					</h1>
					<div class="space-y-6 pt-6 pb-5">
						<slot {setData} errors={$errors} {getValue} />
						{#if 'relationalFields' in model}
							{#each model.relationalFields as field}
								<SelectEntity
									{field}
									initialValue={$data2[field]}
									invalid={!!getValue($errors, field)}
									invalidText={getValue($errors, field)?.[0]}
									on:select={(e) => {
										setData(field, e.detail);
									}}
								/>
							{/each}
						{/if}
						{#each model.basicFields as field}
							<Input
								name={field}
								value={$data2[field]}
								invalid={!!getValue($errors, field)}
								invalidText={getValue($errors, field)?.[0]}
								on:select={(e) => {
									setData(field, e.detail.value);
								}}
								on:clear={() => {
									setData(field, '');
								}}
							/>
						{/each}
						{#if model.name === 'maintenanceOrders' || model.name === 'expenses'}
							<div class="relative pt-10">
								<div
									class="absolute inset-0 inset-x-2 flex items-center"
									aria-hidden="true"
								>
									<div class="w-full border-t-2 border-gray-300" />
								</div>
								<div class="relative flex justify-start" />
							</div>
							<div class="flex flex-col gap-6">
								<AttributeEntity
									invalid={!!getValue($errors, 'clientId')}
									invalidText={getValue($errors, 'clientId')?.[0]}
									on:select={(e) => {
										e.detail.forEach((item) => {
											console.log({ item }, 'Form.svelte ~ 131');
											setData(item.fieldName, item.value ?? null);
										});
									}}
								/>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-shrink-0 justify-end space-x-4 px-4 py-4">
			<button
				type="button"
				class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				on:click={() => console.log($data2, $errors)}
			>
				Cancel
			</button>

			<Button
				text={data?.id ? 'Save changes' : 'Create new'}
				disabled={!noErrorMsg || $isSubmitting}
				loading={$isSubmitting}
			/>
		</div>
	</form>
	{#if dev}
		<div class="prose py-6"><pre>{JSON.stringify($data2, null, 2)}</pre></div>
		<div class="prose py-6"><pre>{JSON.stringify($errors, null, 2)}</pre></div>
	{/if}
</div>
