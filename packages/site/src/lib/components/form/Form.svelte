<script lang="ts">
	import { dev } from '$app/env';
	import { goto } from '$app/navigation';
	import getEditorErrors from '$lib/client/getEditorErrors';
	import { trpc } from '$lib/client/trpc';
	import Input2 from '$lib/components/form/Input2.svelte';
	import SelectEntity from '$lib/components/form/SelectEntity.svelte';
	import { addToast } from '$lib/stores/toast';
	import { forceDateToInput, objectKeys } from '$lib/utils/common';
	import type { EntityInstance } from '$models/types/entity.type';
	import { validateSchema } from '@felte/validator-zod';
	import { TRPCClientError } from '@trpc/client';
	import { createForm, getValue } from 'felte';
	import type { z } from 'zod';
	import Button from '../Button.svelte';
	import AttributeEntity from './AttributeEntity.svelte';
	import Input from './Input.svelte';

	export let entity: EntityInstance;

	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setData,
		isValid,
	} = createForm<z.infer<typeof entity.schema>>({
		transform: (values) => {
			const original = values as z.infer<typeof entity.schema>;
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
		initialValues: entity.data,
		schema: entity.schema,
		validate: validateSchema(entity.schema),
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
			const submitted = await trpc().mutation(`${entity.urlName}:save`, values);
			console.log({ submitted }, 'FormTrpc.svelte ~ 44');
			await goto(`/${entity.urlName}/${submitted.id}`);
			addToast({
				props: {
					kind: 'success',
					title: 'Success',
				},
			});
		},
	});

	const options = entity.getRelationOptions();
	let { client, property, unit, tenant } = options;

	$: FormType = entity.data?.id ? ('edit' as const) : ('new' as const);
	console.log({ entity }, 'Form.svelte ~ 84');
</script>

<svelte:head>
	<title>{`Edit ${entity.singularCap}`}</title>
</svelte:head>
<div class="mx-auto h-full py-8 sm:w-[500px]">
	<form
		use:form
		class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
		data-test={$isValid ? 'ok' : 'error'}
	>
		<div class="h-0 flex-1">
			<div class="flex flex-col justify-between">
				<div class="divide-y divide-gray-200 px-4 sm:px-6">
					<h1 class="py-4 text-lg font-medium text-gray-700">
						{FormType === 'edit' ? 'Edit ' : 'New '}{entity.singularCap}
					</h1>
					<div class="space-y-6 pt-6 pb-5">
						{#if entity.relationalFields && entity.urlName !== 'expenses' && entity.urlName !== 'maintenanceOrders'}
							{#each entity.relationalFields as field}
								{#if field === 'clientId'}
									<SelectEntity
										{field}
										selected={client}
										invalid={!!getValue($errors, field)}
										invalidText={getValue($errors, field)?.[0]}
										on:select={(e) => {
											client = e.detail;
											setData('clientId', e.detail.value);
											property = undefined;
											setData('propertyId', null);
											unit = undefined;
											setData('unitId', null);
										}}
									/>
								{:else if field === 'propertyId'}
									<SelectEntity
										{field}
										selected={property}
										parent={client}
										disabled={!client}
										invalid={!!getValue($errors, field)}
										invalidText={getValue($errors, field)?.[0]}
										on:select={(e) => {
											property = e.detail;
											setData('propertyId', e.detail.value);
											unit = undefined;
											setData('unitId', null);
										}}
									/>
								{:else if field === 'unitId'}
									<SelectEntity
										{field}
										selected={unit}
										parent={property}
										disabled={!client || !property}
										invalid={!!getValue($errors, field)}
										invalidText={getValue($errors, field)?.[0]}
										on:select={(e) => {
											setData('unitId', e.detail.value);
										}}
									/>
								{:else if field === 'tenantId'}
									<SelectEntity
										{field}
										selected={tenant}
										invalid={!!getValue($errors, field)}
										invalidText={getValue($errors, field)?.[0]}
										on:select={(e) => {
											setData('tenantId', e.detail.value);
										}}
									/>
								{/if}
							{/each}
						{/if}
						<slot {setData} errors={$errors} {getValue} />
						{#each entity.basicFields as field}
							<Input2
								{field}
								errors={$errors}
								on:select={(e) => {
									setData(field.name, e.detail.value);
								}}
								on:clear={() => {
									setData(field.name, '');
								}}
							/>
						{/each}
						{#if entity.urlName === 'maintenanceOrders' || entity.urlName === 'expenses'}
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
									{client}
									{property}
									{unit}
									initial={entity.attribution}
									invalid={!!getValue($errors, 'clientId')}
									invalidText={getValue($errors, 'clientId')?.[0]}
									on:select={(e) => {
										e.detail.forEach((item) => {
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
			<Button
				text={FormType === 'edit' ? 'Save changes' : 'Create new'}
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
