<script lang="ts">
	import FormNew from '$components/form/FormNew.svelte';
	import SearchBox from '$components/form/SearchBox.svelte';
	import { fieldList as clientFieldList } from '$lib/definitions/Clients';
	import { fieldList, schema } from '$lib/definitions/Leases';
	import { fieldList as propertyFieldList } from '$lib/definitions/Properties';
	import { fieldList as tenantFieldList } from '$lib/definitions/Tenants';
	import { fieldList as unitFieldList } from '$lib/definitions/Units';
	import { onMount } from 'svelte';
	import {
		AddLeaseDocument,
		ClientComboBoxDocument,
		PropertyComboBoxDocument,
		TenantComboBoxDocument,
		UnitComboBoxDocument,
	} from './_add.gql';
	import { writable } from 'svelte/store';
	export let moreData = writable({});

	const placeholder = (fields: string[]): string =>
		`Type to search by ${fields.map((field) => `${field}`).join(', ')}`;

	onMount(() => {
		// $touched.tenant_id = false;
		// $touched.client_id = false;
		// $touched.property_id = false;
		// $touched.unit_id = false;
		// wait for 1 second
		// setTimeout(() => {
		// 	reset();
		// }, 1);
	});
	let cData;
</script>

<FormNew
	bind:cData
	{schema}
	{fieldList}
	url={(id) => `/leases`}
	subtitle="Lease"
	mutationDoc={AddLeaseDocument}
	initialValues={{
		deposit: 2,
		start_date: '2022-01-31',
		end_date: '2023-01-30',
	}}
	validation={(values) => {
		// TODO dynamic
		// const newErrors: Partial<{
		// 	[Property in keyof typeof values]: string[];
		// }> = {};
		const newErrors = {};
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
	}}
	onMountReset={(touched) => {
		touched.tenant_id = false;
		touched.client_id = false;
		touched.property_id = false;
		touched.unit_id = false;
	}}
	{moreData}
	let:data
	let:errors
	let:setTouched
>
	<button on:click={() => console.log(data)}>see data</button>
	<button on:click={() => console.log($moreData)}>more data</button>
	<div class="max-w-md grid grid-cols-1 gap-8">
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
					invalid: !!(errors.tenant_id?.length ?? 0 > 0),
					invalidText: errors.tenant_id?.[0],
				}}
				bind:selectedId={$moreData.tenant_id}
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
					invalid: !!(errors.client_id?.length ?? 0 > 0),
					invalidText: errors.client_id?.[0],
				}}
				bind:selectedId={$moreData.client_id}
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
						invalid: !!(errors.property_id?.length ?? 0 > 0),
						invalidText: errors.property_id?.[0],
						disabled: !data.client_id,
					}}
					bind:selectedId={$moreData.property_id}
					constraint={{ client_id: { _eq: parseInt(data.client_id || '') } }}
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
						invalid: !!(errors.unit_id?.length ?? 0 > 0),
						invalidText: errors.unit_id?.[0],
						disabled: !data.property_id,
					}}
					bind:selectedId={$moreData.unit_id}
					constraint={{
						property_id: { _eq: parseInt(data.property_id || '') },
					}}
				/>
			</div>
		</div>
	</div>
</FormNew>
