<script lang="ts">
	import ModalGeneric from '$components/modal/ModalGeneric.svelte';
	import { key } from '$components/keyyy';
	import { getContext } from 'svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	// import type { ObjectSchema } from 'yup';

	import { failureToast, successToast } from '$components/toasts';
	import MyInput from '$components/form/MyInput.svelte';
	import { mutation, OperationStore, operationStore } from '@urql/svelte';
	import type { DocumentNode } from 'graphql';
	import type { Field, FieldList } from '$components/form/Field';

	export let existing = undefined;
	if (existing) {
		delete existing.__typename;
	}

	// local closeModal variable to close the modal
	let _closeModal;
	const { getInsertDoc, getUpdateDoc, getFieldList } = getContext(key);
	const insertDocumentNode: DocumentNode = getInsertDoc();
	const updateDocumentNode: DocumentNode = getUpdateDoc();
	const fieldList: SvelteStore<FieldList> = getFieldList();

	// insert mutation
	const insertStore = operationStore(insertDocumentNode);
	const insertMutation = mutation(insertStore);

	// update mutation
	const updateStore = operationStore(updateDocumentNode);
	const updateMutation = mutation(updateStore);

	const {
		form,
		errors,
		state,
		isValid,
		isSubmitting,
		validateField,
		handleChange,
		handleSubmit
	} = createForm({
		initialValues: { ...existing },
		validationSchema: $fieldList.getValidations(),
		onSubmit: async (values) => {
			!existing
				? await insertForm(insertMutation(values))
				: await insertForm(
						updateMutation({
							id: values.id,
							// exclude id field?
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
				_closeModal();
			}
		});
	};

	const advHandleChange = (event) => {
		// Normally, a field is validatated when (1) IT is changed
		// or (2) IT gets blurred. This function is designed to
		// validate end_date whenever start_date is changed/blurred.
		if (
			event.target.name === 'start_date' ||
			event.target.id === 'start_date'
		) {
			validateField('end_date');
		}
		handleChange(event);
	};
</script>

<ModalGeneric>
	<div slot="trigger" let:openModal>
		{#if !existing}
			<button
				class="btn btn-lg lg:btn-wide btn-primary"
				tabindex="-1"
				on:click={openModal}
			>
				New
			</button>
		{:else}
			<button
				class="btn btn-secondary btn-sm"
				tabindex="-1"
				on:click={openModal}
			>
				Edit
			</button>
		{/if}
	</div>
	<div slot="content" let:closeModal>
		<form
			on:submit|preventDefault={(formData) => {
				_closeModal = closeModal;
				handleSubmit(formData);
			}}
		>
			<div class="flex flex-col" />
			{#each $fieldList.fieldList as { fieldName, title, editable, inputType, validation }}
				{#if editable}
					<MyInput
						on:change={advHandleChange}
						on:blur={advHandleChange}
						bind:value={form[fieldName]}
						bind:errors={$errors[fieldName]}
						{title}
						{fieldName}
						type={inputType}
						required={validation?.exclusiveTests?.required}
					/>
				{/if}
			{/each}

			<div class="flex justify-end space-x-4">
				<button
					class="btn btn-ghost w-1/3"
					on:click|preventDefault={() => {
						console.log($form), console.log($state);
					}}>debug</button
				>
				<button class="btn btn-ghost w-1/3" on:click|preventDefault={closeModal}
					>Cancel</button
				>
				<button
					class="btn btn-primary w-1/3"
					class:loading={$isSubmitting}
					disabled={!$isValid}
					type="submit">{!existing ? 'Add' : 'Save Changes'}</button
				>
			</div>
		</form>
	</div>
</ModalGeneric>
