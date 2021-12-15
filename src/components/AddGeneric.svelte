<script lang="ts">
	import { createForm } from 'felte';
	import {
		svelteReporter as reporter,
		ValidationMessage
	} from '@felte/reporter-svelte';
	import { validator, ValidatorConfig } from '@felte/validator-yup';
	import type * as yup from 'yup';
	import type { DocumentNode } from 'graphql';
	import type { FieldList } from '$components/form/Field';
	import { mutation, OperationStore, operationStore } from '@urql/svelte';
	import { failureToast, successToast } from '$components/toasts';
	import { page } from '$app/stores';

	export let fieldList: FieldList;
	export let insertDoc: DocumentNode = undefined;
	export let updateDoc: DocumentNode = undefined;

	export let existing = undefined;

	// insert mutation
	const insertStore = operationStore(insertDoc);
	const insertMutation = mutation(insertStore);

	// update mutation
	const updateStore = operationStore(updateDoc);
	const updateMutation = mutation(updateStore);

	const schema = fieldList.getValidations();
	const { form, isValid, isSubmitting, reset } = createForm<
		yup.InferType<typeof schema>,
		ValidatorConfig
	>({
		extend: [validator, reporter],
		validateSchema: schema,
		onSubmit: async (values) => {
			console.log(values);
			!existing
				? await insertForm(insertMutation(values))
				: await insertForm(
						updateMutation({
							id: existing.id,
							_set: { ...values }
						})
				  );
			console.dir(values);
		}
	});

	const insertForm = async (theMutation: Promise<OperationStore>) => {
		await theMutation.then((result) => {
			if (result.error) {
				console.error('An error occured', result.error);
				failureToast('Error occured');
			} else if (result.data) {
				console.log('Mutation successful', result.data);
				successToast(!existing ? 'Added successfully' : 'Changes saved');
				reset();
			}
		});
	};
</script>

<form use:form>
	<div class="max-w-4xl mx-auto px-6">
		<div class="grid grid-cols-1 gap-2 mt-8 max-w-md justify-self-center">
			{#each fieldList.fieldList as { title, fieldName, inputType, editable } (fieldName)}
				{#if editable}
					<ValidationMessage for={fieldName} let:messages={message}>
						<div class="form-control">
							<label class="label" for={fieldName}>
								<span class="label-text"
									>{`${title}${
										schema?.fields[fieldName]?.spec?.presence != 'optional'
											? '*'
											: ''
									}`}</span
								>
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
