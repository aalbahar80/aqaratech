<script lang="ts">
	import type { Field } from '$components/form/Field';
	import { failureToast, successToast } from '$components/toasts';
	import {
		svelteReporter as reporter,
		ValidationMessage,
	} from '@felte/reporter-svelte';
	import type { ValidatorConfig } from '@felte/validator-zod';
	import { validator } from '@felte/validator-zod';
	import { mutation, operationStore } from '@urql/svelte';
	import {
		Button,
		Form,
		FormGroup,
		InlineLoading,
		TextInput,
	} from 'carbon-components-svelte';
	import { createForm } from 'felte';
	import type { DocumentNode } from 'graphql';
	import isEmpty from 'just-is-empty';
	import reduce from 'just-reduce-object';
	import type { z, ZodObject } from 'zod';

	export let entity: string;
	export let fieldList: Field[];
	export let insertDoc: DocumentNode | undefined = undefined;

	export let updateDoc: DocumentNode | undefined = undefined;
	export let existing: T | undefined = undefined;
	export let validation: ZodObject<any>;

	type T = $$Generic;

	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	// insert mutation
	const insertStore = operationStore(insertDoc);
	const insertMutation = mutation(insertStore);
	// update mutation
	const updateStore = operationStore(updateDoc);
	const updateMutation = mutation(updateStore);

	let state = 'dormant'; // "dormant" | "active" | "finished" | "inactive"

	const handleForm = async (values: T) => {
		state = 'active';
		try {
			if (existing) {
				await updateMutation({
					id: existing.id,
					_set: values,
				});
				successToast('Success');
				state = 'finished';
			} else {
				await insertMutation({ object: values });
				successToast('Success');
				state = 'finished';
				// reset();
			}
		} catch (e) {
			console.error(e);
			failureToast(e.message);
			state = 'error';
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

	const { reset, data, errors, handleSubmit } = createForm<
		z.infer<typeof validation>,
		ValidatorConfig
	>({
		initialValues: initial(),
		extend: [validator, reporter],
		validateSchema: validation,
		onSubmit: handleForm,
	});

	const descriptionMap = {
		active: 'Submitting...',
		finished: 'Success',
		error: 'An error occurred',
	};
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
			{#if state !== 'dormant'}
				<span>
					<InlineLoading status={state} description={descriptionMap[state]} />
				</span>
			{:else}
				<Button disabled={!noErrorMsg} type="submit"
					>{`${existing ? 'Edit' : 'Create new'} ${entity}`}
				</Button>
			{/if}
		</div>
	</Form>
</div>
