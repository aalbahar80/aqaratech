<script lang="ts">
	import type { Field } from '$components/form/Field';
	import { failureToast, successToast } from '$components/toasts';
	import { v } from '$lib/Validations';
	import {
		svelteReporter as reporter,
		ValidationMessage
	} from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { mutation, operationStore } from '@urql/svelte';
	import { createForm } from 'felte';
	import type { DocumentNode } from 'graphql';

	export let entity: string;
	export let fieldList: Field[];
	export let insertDoc: DocumentNode = undefined;
	export let updateDoc: DocumentNode = undefined;

	export let existing = undefined;
	// insert mutation
	const insertStore = operationStore(insertDoc);
	const insertMutation = mutation(insertStore);

	// update mutation
	const updateStore = operationStore(updateDoc);
	const updateMutation = mutation(updateStore);

	const handleForm = async (values) => {
		try {
			if (existing) {
				await updateMutation({
					id: existing.id,
					_set: values
				});
				successToast('Success');
			} else {
				await insertMutation({ object: values });
				successToast('Success');
				reset();
			}
		} catch (e) {
			console.log(e);
			failureToast(e.message);
		} finally {
		}
	};

	const { form, isValid, isSubmitting, reset, validate, data, errors } =
		createForm({
			extend: [validator, reporter],
			validateSchema: v[entity],
			onSubmit: handleForm
		});
</script>

<form use:form>
	<div class="max-w-4xl mx-auto px-6">
		<div class="grid grid-cols-1 gap-2 mt-8 max-w-md justify-self-center">
			{#each fieldList as { title, fieldName, inputType, editable }}
				{#if editable}
					<ValidationMessage for={fieldName} let:messages={message}>
						<div class="form-control">
							<label class="label" for={fieldName}>
								<span class="label-text">{`${title}`}</span>
							</label>
							<input
								id={fieldName}
								name={fieldName}
								type={inputType}
								value={existing ? existing[fieldName] : ''}
								aria-describedby={`${fieldName}-validation`}
								placeholder={title}
								class="input input-bordered"
								class:input-warning={message}
							/>
						</div>
						<label for={fieldName} class="label">
							<span
								name="placeholder"
								id={`${fieldName}-validation`}
								class="{fieldName}-validation label-text-alt {message
									? 'visible'
									: 'invisible'}"
								aria-live="polite">{message || '.'}</span
							>
						</label>
					</ValidationMessage>
				{/if}
			{/each}
			<button
				class="btn btn-primary"
				class:loading={$isSubmitting}
				disabled={!$isValid}
				type="submit">Submit</button
			>
		</div>
	</div>
</form>

<button on:click={validate}>validate</button>
<button on:click={() => console.log($data)}>debug</button>
<button on:click={() => console.log(fieldList)}>fieldList</button>
<button on:click={() => console.log($errors)}>errors</button>
<!-- <button on:click={() => console.log(leaseValidation)}>leaseValidation</button> -->
