<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';
	import type { ValidatorConfig } from '@felte/validator-zod';
	import type { z } from 'zod';

	import SearchBox from '$components/form/SearchBox.svelte';
	import { fieldList as clientFieldList } from '$lib/definitions/Clients';
	import { fieldList, validation } from '$lib/definitions/Leases';
	import { fieldList as propertyFieldList } from '$lib/definitions/Properties';
	import { fieldList as tenantFieldList } from '$lib/definitions/Tenants';
	import { fieldList as unitFieldList } from '$lib/definitions/Units';
	import {
		AddLeaseDocument,
		ClientComboBoxDocument,
		PropertyComboBoxDocument,
		TenantComboBoxDocument,
		UnitComboBoxDocument,
	} from './_add.gql';
	import FormFields from '$components/form/FormFields.svelte';
	import { Button } from 'carbon-components-svelte';
	import { svelteReporter } from '@felte/reporter-svelte';
	import { onMount } from 'svelte';
	import map from 'just-map-values';
	import { mutation, operationStore } from '@urql/svelte';
	import { addToast } from '$lib/stores/toast';
	import { goto } from '$app/navigation';

	export let schema;
	export let mutationDoc;
	export let validation;
	export let url;
	const schema = validation;

	const placeholder = (fields: string[]): string =>
		`Type to search by ${fields.map((field) => `${field}`).join(', ')}`;

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const {
		form,
		validate,
		data,
		errors,
		touched,
		setTouched,
		reset,
		setInitialValues,
	} = createForm<z.infer<typeof schema>, ValidatorConfig>({
		extend: [validator, svelteReporter],
		validateSchema: schema,
		validate: (values) => {
			// TODO dynamic
			const newErrors: Partial<{
				[Property in keyof typeof values]: string[];
			}> = {};
			if (values.start_date && values.end_date) {
				if (values.start_date > values.end_date) {
					newErrors.start_date = ['Start date must be before end date'];
					newErrors.end_date = ['End date must be after start date'];
				}
			}
			if (!values.client_id && !values.property_id) {
				newErrors.property_id = ['Select a client first'];
			}
			if (!values.property_id && !values.unit_id) {
				newErrors.unit_id = ['Select a property first'];
			}
			return newErrors;
		},
		// transform: (values) => values.map((v) => (v === '' ? null : v)),
		// transform: (values) => map(values, (v) => (v === '' ? null : v)),
		// touchTriggerEvents: { blur: false, change: false, input: false },
		onSubmit: async (allValues) => {
			const nullifiedValues = map(allValues, (v) => (v === '' ? null : v));
			const { client_id, property_id, ...values } = allValues;
			// TODO dynamic
			const res = await mutation(operationStore(AddLeaseDocument))({
				// TODO dynamic
				object: values,
			});
			addToast({
				props: {
					title: 'Success',
					kind: 'success',
					// TODO dynamic
					subtitle: '[entity] updated',
				},
			});
			// TODO reconsider await
			// TODO dynamic
			const id = await res.data?.result?.id;
			await goto(`/${'leases'}/${id?.toString()}`);
			// ...
		},
	});

	setInitialValues({
		deposit: 2,
		start_date: '2022-01-31',
		end_date: '2023-01-30',
	});
	onMount(() => {
		$touched.tenant_id = false;
		$touched.client_id = false;
		$touched.property_id = false;
		$touched.unit_id = false;
		// wait for 1 second
		setTimeout(() => {
			reset();
		}, 1);
	});
</script>

<div class="max-w-md grid grid-cols-1 gap-8">
	<form use:form>
		<div class="div grid grid-cols-1 gap-y-4">
			<SearchBox
				queryDocument={TenantComboBoxDocument}
				fieldList={tenantFieldList}
				display={(hit) => ({
					id: hit.id.toString(),
					text: [hit.first_name, hit.last_name].join(' '),
				})}
				comboBoxProps={{
					titleText: 'Tenant',
					placeholder: 'Type to search by name, civil id, phone, etc',
					invalid: !!($errors.tenant_id?.length ?? 0 > 0),
					invalidText: $errors.tenant_id?.[0],
				}}
				bind:selectedId={$data.tenant_id}
			/>

			<SearchBox
				queryDocument={ClientComboBoxDocument}
				fieldList={clientFieldList}
				display={(hit) => ({
					id: hit.id.toString(),
					text: [hit.first_name, hit.last_name].join(' '),
				})}
				comboBoxProps={{
					titleText: 'Client',
					placeholder: placeholder([
						'name',
						'civil id',
						'phone',
						'email',
						'etc',
					]),
					invalid: !!($errors.client_id?.length ?? 0 > 0),
					invalidText: $errors.client_id?.[0],
				}}
				bind:selectedId={$data.client_id}
			/>

			<div
				on:click={() => {
					setTouched('property_id');
				}}
			>
				<SearchBox
					queryDocument={PropertyComboBoxDocument}
					fieldList={propertyFieldList}
					display={(hit) => ({
						id: hit.id.toString(),
						text: [hit.area, hit.block].join(' '),
					})}
					comboBoxProps={{
						titleText: 'Property',
						placeholder: placeholder(['address']),
						invalid: !!($errors.property_id?.length ?? 0 > 0),
						invalidText: $errors.property_id?.[0],
						disabled: !$data.client_id,
					}}
					bind:selectedId={$data.property_id}
					constraint={{ client_id: { _eq: parseInt($data.client_id || '') } }}
				/>
			</div>

			<div
				on:click={() => {
					setTouched('unit_id');
				}}
			>
				<SearchBox
					queryDocument={UnitComboBoxDocument}
					fieldList={unitFieldList}
					display={(hit) => ({
						id: hit.id.toString(),
						text: hit.unit_number || hit.id.toString(),
					})}
					comboBoxProps={{
						titleText: 'Unit',
						placeholder: placeholder(['unit number']),
						invalid: !!($errors.unit_id?.length ?? 0 > 0),
						invalidText: $errors.unit_id?.[0],
						disabled: !$data.property_id,
					}}
					bind:selectedId={$data.unit_id}
					constraint={{
						property_id: { _eq: parseInt($data.property_id || '') },
					}}
				/>
			</div>
			<FormFields {fieldList} />

			<button type="submit">submit</button>
			<Button kind="ghost" on:click={() => console.log($data)}>Debug</Button>
			<Button kind="ghost" on:click={() => console.log($errors)}>Errors</Button>
			<Button kind="ghost" on:click={() => validate()}>Validate</Button>
			<Button kind="ghost" on:click={() => reset()}>reset</Button>
		</div>
	</form>
</div>
