<script lang="ts">
	import { goto } from '$app/navigation';
	import getEditorErrors from '$lib/client/getEditorErrors';
	import trpc, {
		type InferMutationInput,
		type InferQueryOutput,
	} from '$lib/client/trpc';
	import { singular, type Entity } from '$lib/definitions';
	import { addToast } from '$lib/stores/toast';
	import { validateSchema } from '@felte/validator-zod';
	import { TRPCClientError } from '@trpc/client';
	import { createForm, getValue } from 'felte';
	import isPlainObject from 'lodash-es/isPlainObject.js';
	import startCase from 'lodash-es/startCase.js';
	import type { z } from 'zod';
	import ComboBoxRel from './ComboBoxRel.svelte';
	import Input from './Input.svelte';

	export let entity: Entity;
	export let schema: z.AnyZodObject | z.ZodEffects<any>;
	export let data:
		| InferMutationInput<`${typeof entity}:save`>
		| InferQueryOutput<`${typeof entity}:basic`>;

	$: noErrorMsg = Object.values($errors).every((e) => e === null);
	$: console.log(data);
	$: console.log($data2);

	const relationalFields: {
		[key: string]: Extract<Entity, 'tenants' | 'units'>;
	} = {
		tenantId: 'tenants',
		unitId: 'units',
	};

	const {
		form,
		errors,
		isSubmitting,
		data: data2,
		setData,
		touched,
	} = createForm({
		validate: validateSchema(schema as z.AnyZodObject),
		onError: (err) => {
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
				},
			});
			if (err instanceof TRPCClientError) {
				const serverErrors = getEditorErrors(err);
				return serverErrors;
			}
			return err;
		},
		onSubmit: async (values) => {
			console.log(values);
			const submitted = await trpc.mutation(`${entity}:save`, values);
			console.log({ submitted }, 'FormTrpc.svelte ~ 44');
			addToast({
				props: {
					kind: 'success',
					title: 'Success',
				},
			});
			await goto(`/${entity}/${submitted.id}`);
		},
	});

	const initialValue = $data2.tenantId;

	$: {
		if (initialValue !== $data2.tenantId) {
			$touched.tenantId = true;
		}
	}
</script>

<div class="mx-auto h-full max-w-xl py-8">
	<form
		use:form
		class="flex h-full flex-col divide-y divide-gray-200 rounded-md bg-white shadow"
	>
		<div class="h-0 flex-1">
			<div class="flex flex-col justify-between">
				<div class="divide-y divide-gray-200 px-4 sm:px-6">
					<h1 class="py-4 text-lg font-medium text-gray-700">
						{data?.id ? 'Edit ' : 'New '}{startCase(singular[entity])}
					</h1>
					<div class="space-y-6 pt-6 pb-5">
						{#if data}
							{#each Object.entries(data) as [name, value] (name)}
								{#if relationalFields[name] && (typeof value === 'string' || value === null)}
									<!-- Add asterisk like trpc-sveltekit example -->
									<ComboBoxRel
										{value}
										optionLabel={data[singular[relationalFields[name]]]}
										entity={relationalFields[name]}
										invalidText={getValue($errors, name)?.[0]}
										on:select={(e) => {
											setData(name, e.detail.id);
										}}
										on:clear={() => {
											setData(name, '');
										}}
									/>
								{:else if !isPlainObject(value) && name !== 'unit' && name !== 'tenant'}
									<Input
										{name}
										{value}
										invalid={!!getValue($errors, name)}
										invalidText={getValue($errors, name)?.[0]}
									/>
								{/if}
							{/each}
						{/if}
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-shrink-0 justify-end px-4 py-4">
			<button
				type="button"
				class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				on:click={() => console.log($data2, $errors)}
			>
				Cancel
			</button>
			<button
				type="submit"
				disabled={!noErrorMsg || $isSubmitting}
				class="submit-button"
			>
				<svg
					class:hidden={!$isSubmitting}
					class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						class="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						stroke-width="4"
					/>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				Save
			</button>
		</div>
	</form>
</div>

<style lang="postcss">
	.submit-button {
		@apply ml-4 inline-flex w-1/5 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
		@apply disabled:cursor-not-allowed disabled:opacity-50;
	}
</style>
