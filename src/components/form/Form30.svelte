<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Field } from '$components/form/Field';
	import { addToast } from '$lib/stores/toast';
	import {
		svelteReporter as reporter,
		ValidationMessage,
	} from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import type { DocumentNode } from 'graphql';
	import isEmpty from 'just-is-empty';
	import map from 'just-map-values';
	import reduce from 'just-reduce-object';
	import { z } from 'zod';

	type T = $$Generic<{ id: number | string; [key: string]: any }>;

	export let customFields = {};
	export let formData = {};
	export let formErrors = {};
	$: formData = $data;
	$: formErrors = $errors;
	export let entity: string;
	export let fieldList: Field[];
	export let insertDoc: DocumentNode | undefined = undefined;

	export let updateDoc: DocumentNode | undefined = undefined;
	export let existing: T | undefined = undefined;
	export let validation: any;
	export function mySetField(a, b, c) {
		setField(a, b, c);
	}
	// export () => setField;

	let loading = false;
	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	// insert mutation
	let insertStore: OperationStore;
	let insertMutation: ExecuteMutation;
	if (insertDoc) {
		insertStore = operationStore(insertDoc);
		insertMutation = mutation(insertStore);
	}
	// update mutation
	let updateStore: OperationStore;
	let updateMutation: ExecuteMutation;
	if (updateDoc) {
		updateStore = operationStore(updateDoc);
		updateMutation = mutation(updateStore);
	}

	// function to get id value from existing object

	const handleForm = async (values: T) => {
		loading = true;
		// submit empty strings as null
		const newValues = map(values, (v) => (v === '' ? null : v));
		try {
			if (existing) {
				await updateMutation({
					id: existing.id,
					_set: newValues,
				});
				addToast({
					props: {
						title: 'Success',
						kind: 'success',
						subtitle: '[entity] updated',
					},
				});
				await goto(`/${entity}/${existing.id}`);
				loading = false;
			} else {
				const res = await insertMutation({ object: newValues });
				const firstKey = Object.keys(res?.data)[0];
				const { id } = res.data[firstKey];
				addToast({
					props: {
						title: 'Success',
						kind: 'success',
						subtitle: 'New [entity] created',
					},
				});
				await goto(`/${entity}/${id}`);
				loading = false;
			}
		} catch (e) {
			console.error(e);
			addToast({
				props: {
					title: 'Error',
					kind: 'error',
					subtitle: 'An error occured',
				},
			});
			loading = false;
		}
	};

	const initial = (): Partial<T> => {
		// get editable fields
		const fields = fieldList.filter((f) => f.editable).map((f) => f.fieldName);

		// assign them to existing data, otherwise blank
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return reduce(
			fields,
			(acc: { [x: string]: string }, key: any, value: string) => {
				acc[value] = existing?.[value] || '';
				return acc;
			},
			{},
		);
	};

	const { reset, data, errors, handleSubmit, setField, validate } = createForm({
		initialValues: initial(),
		extend: [validator, reporter],
		validateSchema: validation || z.object({}),
		onSubmit: handleForm,
	});

	$: $data.unit_id = customFields.unit_id;
	// $: $data.tenant_id = customFields.tenant_id;

	// onMount(async () => {
	// 	await tick();
	// 	reset();
	// });
</script>

<div class="max-w-md">
	<Form on:submit={handleSubmit}>
		{#each fieldList as { title, fieldName, inputType, editable, pattern, disabled }}
			{#if editable && fieldName !== 'tenant_did'}
				<ValidationMessage for={fieldName} let:messages={message}>
					<FormGroup>
						{#if inputType === 'checkbox'}
							<Checkbox
								labelText={title}
								bind:checked={$data[fieldName]}
								id={fieldName}
								name={fieldName}
							/>
						{:else}
							<TextInput
								id={fieldName}
								type={inputType}
								labelText={title}
								placeholder={title}
								bind:value={$data[fieldName]}
								invalid={!isEmpty($errors[fieldName])}
								invalidText={$errors[fieldName]?.[0]}
								size="xl"
								pattern={fieldName === 'civilid' ? '[0-9]*' : undefined}
								{disabled}
							/>
						{/if}
					</FormGroup>
				</ValidationMessage>
			{/if}
		{/each}

		<div class="grid grid-cols-1 items-center md:grid-cols-2">
			<Button kind="ghost" on:click={reset}>Reset</Button>
			<Button
				disabled={!noErrorMsg}
				class="min-w-full"
				type="submit"
				skeleton={loading}
			>
				{`${existing ? 'Edit' : 'Create new'} ${entity}`}
			</Button>
			<!-- TODO remove in production (including reset button) -->
			<Button kind="ghost" on:click={() => console.log($data)}>Debug</Button>
			<Button kind="ghost" on:click={() => console.log(customFields)}
				>somefn</Button
			>
			<Button kind="ghost" on:click={() => console.log($errors)}>Errors</Button>
			<Button kind="ghost" on:click={() => validate()}>Validate</Button>
		</div>
	</Form>
</div>
