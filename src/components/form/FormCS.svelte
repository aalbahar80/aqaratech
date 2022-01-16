<script lang="ts">
	import type { Field } from '$components/form/Field';
	import { addToast } from '$lib/stores/toast';
	import {
		svelteReporter as reporter,
		ValidationMessage,
	} from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { mutation, operationStore } from '@urql/svelte';
	import { Button, Form, FormGroup, TextInput } from 'carbon-components-svelte';
	import { createForm } from 'felte';
	import type { DocumentNode } from 'graphql';
	import isEmpty from 'just-is-empty';
	import reduce from 'just-reduce-object';
	import map from 'just-map-values';
	import { z } from 'zod';
	import { goto } from '$app/navigation';

	type T = $$Generic<{ id: number; [key: string]: any }>;

	export let entity: string;
	export let fieldList: Field[];
	export let insertDoc: DocumentNode | undefined = undefined;

	export let updateDoc: DocumentNode | undefined = undefined;
	export let existing: T | undefined = undefined;
	export let validation: any;

	let loading = false;
	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	// insert mutation
	const insertStore = operationStore(insertDoc);
	const insertMutation = mutation(insertStore);
	// update mutation
	const updateStore = operationStore(updateDoc);
	const updateMutation = mutation(updateStore);

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

	const { reset, data, errors, handleSubmit } = createForm({
		initialValues: initial(),
		extend: [validator, reporter],
		validateSchema: validation ?? z.object({}),
		onSubmit: handleForm,
	});
</script>

<div class="max-w-md">
	<Form on:submit={handleSubmit}>
		{#each fieldList as { title, fieldName, inputType, editable, pattern }}
			{#if editable}
				<ValidationMessage for={fieldName} let:messages={message}>
					<FormGroup>
						<TextInput
							id={fieldName}
							type={inputType}
							labelText={title}
							placeholder={title}
							bind:value={$data[fieldName]}
							invalid={!isEmpty($errors[fieldName])}
							invalidText={$errors[fieldName]?.[0]}
							pattern={fieldName === 'civilid' ? '[0-9]*' : undefined}
						/>
					</FormGroup>
				</ValidationMessage>
			{/if}
		{/each}

		<div class="grid grid-cols-1 md:grid-cols-2 items-center">
			<Button kind="ghost" on:click={reset}>Reset</Button>
			<Button disabled={!noErrorMsg} type="submit" skeleton={loading}>
				{`${existing ? 'Edit' : 'Create new'} ${entity}`}
			</Button>
		</div>
	</Form>
</div>
