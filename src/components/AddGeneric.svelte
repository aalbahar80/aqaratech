<script lang="ts">
	import { createForm } from 'felte';
	import {
		svelteReporter as reporter,
		ValidationMessage
	} from '@felte/reporter-svelte';
	import { validator, ValidatorConfig } from '@felte/validator-yup';
	import type { DocumentNode } from 'graphql';
	import { Field } from '$components/form/Field';
	import { mutation, operationStore } from '@urql/svelte';
	import { failureToast, successToast } from '$components/toasts';
	import { parseISO } from 'date-fns';
	import * as yup from 'yup';

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

	const fieldList2 = [
		new Field({
			fieldName: 'id',
			title: 'ID',
			editable: false
		}),
		new Field({
			fieldName: 'start_date',
			title: 'Start',
			inputType: 'date',
			validation: yup.string().required()
		}),
		new Field({
			fieldName: 'end_date',
			title: 'End',
			inputType: 'date',
			validation: yup.string().required()
		}),
		new Field({
			fieldName: 'is_expired',
			title: 'Expired?',
			editable: false
		}),
		new Field({
			fieldName: 'is_signed',
			title: 'Signed?',
			editable: false
		}),
		new Field({
			fieldName: 'monthly_rent',
			title: 'Rent (KD)',
			inputType: 'number',
			validation: yup
				.number()
				.required()
				.positive()
				.typeError('Must be a positive number')
		}),
		new Field({
			fieldName: 'deposit',
			title: 'Deposit (KD)',
			inputType: 'number',
			validation: yup
				.number()
				.transform((currentValue, originalValue) => {
					return originalValue === '' ? null : currentValue;
				})
				.nullable()
				.typeError('Amount must be a number')
				.positive()
		}),
		new Field({
			fieldName: 'license',
			title: 'License',
			validation: yup.string()
		}),
		new Field({
			fieldName: 'Lease_id',
			title: 'Lease ID',
			editable: false
		}),
		new Field({
			fieldName: 'unit_id',
			title: 'Unit ID',
			editable: false
		})
	];

	const schema = Field.getValidations(fieldList);
	const schema2 = Field.getValidations(fieldList2);

	const { form, isValid, isSubmitting, reset, validate, data, errors } =
		createForm<yup.InferType<typeof schema>, ValidatorConfig>({
			extend: [validator, reporter],
			validateSchema: schema,
			onSubmit: handleForm,
			validate: (values) => {
				const errors = {};
				if (parseISO(values.start_date) > parseISO(values.end_date)) {
					errors.start_date = 'Start date must be before end date';
					errors.end_date = 'End date must be after start date';
				}
				return errors;
			}
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
<button on:click={() => console.log(schema)}>scehma</button>
<button on:click={() => console.log(schema2)}>scehma2</button>
<button on:click={() => console.log(form)}>form</button>
<button on:click={() => console.log($errors)}>errors</button>
