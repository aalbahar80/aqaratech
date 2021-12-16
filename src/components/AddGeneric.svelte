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
	import {
		mutation,
		OperationStore,
		operationStore,
		query
	} from '@urql/svelte';
	import { failureToast, successToast } from '$components/toasts';
	import { parseISO } from 'date-fns';

	export let fieldList: FieldList;
	export let insertDoc: DocumentNode = undefined;
	export let updateDoc: DocumentNode = undefined;

	export let existing = undefined;
	// insert mutation
	const insertStore = operationStore(insertDoc);
	const insertMutation = mutation(insertStore);
	console.log('INSERT DOC HERE', insertDoc);

	// update mutation
	const updateStore = operationStore(updateDoc);
	const updateMutation = mutation(updateStore);
	console.log(updateDoc);

	const handleSubmit = async (values) => {
		console.log(values);
		try {
			if (existing) {
				// console.log('updateDoc is', updateDoc);
				// console.log('updateMut is', updateDoc);
				// console.log('values', values);
				// console.log('id', existing.id);
				// await updateMutation({
				// 	id: existing.id,
				// 	_set: values
				// });
				await insertMutation({ object: values });
			} else {
				await insertMutation({ object: values });
			}
			successToast('Success');
		} catch (e) {
			console.log(e);
			failureToast(e.message);
		} finally {
			console.log(values);
			console.log({ ...values });
		}
	};

	const schema = fieldList.getValidations();
	const { form, isValid, isSubmitting, reset, validate, data, errors } =
		createForm({
			extend: [validator, reporter],
			validateSchema: schema,
			onSubmit: handleSubmit,
			// transform: (values) => ({
			// 	...values,
			// 	start_date: parseISO(values.start_date),
			// 	end_date: parseISO(values.end_date)
			// }),
			validate: (values) => {
				const errors = {};
				if (parseISO(values.start_date) > parseISO(values.end_date)) {
					errors.start_date = 'Start date must be before end date';
					errors.end_date = 'End date must be after start date';
				}
				return errors;
			}
		});

	// const insertForm = async (theMutation: Promise<OperationStore>) => {
	// 	await theMutation.then((result) => {
	// 		if (result.error) {
	// 			console.error('An error occured', result.error);
	// 			failureToast('Error occured');
	// 		} else if (result.data) {
	// 			console.log('Mutation successful', result.data);
	// 			successToast(!existing ? 'Added successfully' : 'Changes saved');
	// 			reset();
	// 		}
	// 	});
	// };
</script>

<form use:form>
	<div class="max-w-4xl mx-auto px-6">
		<div class="grid grid-cols-1 gap-2 mt-8 max-w-md justify-self-center">
			{#each fieldList.fieldList as { title, fieldName, inputType, editable }}
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

<button on:click={validate}>validate</button>
<button on:click={() => console.log($data)}>debug</button>
<button on:click={() => console.log($errors)}>errors</button>
