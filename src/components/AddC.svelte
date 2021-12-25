<script lang="ts">
	import {
		Form,
		FormGroup,
		Checkbox,
		RadioButtonGroup,
		RadioButton,
		Select,
		SelectItem,
		Button,
		TextInput,
		ButtonSet,
		InlineLoading,
		Grid,
		Row,
		Column,
	} from 'carbon-components-svelte';
	import flatten from 'just-flatten-it';
	import isEmpty from 'just-is-empty';
	import reduce from 'just-reduce-object';
	import { onDestroy, onMount } from 'svelte';

	import type { Field } from '$components/form/Field';
	import { failureToast, successToast } from '$components/toasts';
	import { v } from '$lib/Validations';
	import {
		svelteReporter as reporter,
		ValidationMessage,
	} from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { mutation, operationStore } from '@urql/svelte';
	import { createForm } from 'felte';
	import type { DocumentNode } from 'graphql';
	import pluck from 'just-pluck-it';
	import zip from 'just-zip-it';

	export let entity: string;
	export let fieldList: Field[];
	export let insertDoc: DocumentNode = undefined;
	export let updateDoc: DocumentNode = undefined;

	export let existing = undefined;
	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	// insert mutation
	const insertStore = operationStore(insertDoc);
	const insertMutation = mutation(insertStore);
	// update mutation
	const updateStore = operationStore(updateDoc);
	const updateMutation = mutation(updateStore);

	const handleForm = async (values) => {
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
			console.log(e);
			failureToast(e.message);
			state = 'error';
		}
	};

	const initial = () => {
		// get editable fields
		const fields = fieldList.filter((f) => f.editable).map((f) => f.fieldName);

		// assign them to existing data, otherwise blank
		return reduce(
			fields,
			(acc, key, value) => {
				acc[value] = existing?.[value] || '';
				return acc;
			},
			{},
		);
	};

	const {
		form,
		isValid,
		isSubmitting,
		reset,
		validate,
		data,
		errors,
		isDirty,
		handleSubmit,
	} = createForm({
		initialValues: initial(),
		extend: [validator, reporter],
		validateSchema: v[entity] || v.fallback,
		onSubmit: handleForm,
	});

	const descriptionMap = {
		active: 'Submitting...',
		finished: 'Success',
		error: 'An error occurred',
	};
	let state = 'dormant'; // "dormant" | "active" | "finished" | "inactive"
</script>

<div class="lg:max-w-lg">
	<Form on:submit={handleSubmit}>
		{#each fieldList as { title, fieldName, inputType, editable }}
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
						/>
					</FormGroup>
				</ValidationMessage>
			{/if}
		{/each}

		<Row>
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
		</Row>
	</Form>
</div>
