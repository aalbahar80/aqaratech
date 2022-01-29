<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import SearchBox from '$components/form/SearchBox.svelte';
	import { fieldList, graphqlName, validation } from '$lib/definitions/Leases';
	import { fieldList as clientFieldList } from '$lib/definitions/Clients';
	import { fieldList as tenantFieldList } from '$lib/definitions/Tenants';
	import { fieldList as propertyFieldList } from '$lib/definitions/Properties';
	import { fieldList as unitFieldList } from '$lib/definitions/Units';
	import {
		AddLeaseDocument,
		ClientComboBoxDocument,
		PropertyComboBoxDocument,
		TenantComboBoxDocument,
		UnitComboBoxDocument,
	} from './_add.gql';

	const placeholder = (fields: string[]): string =>
		`Type to search by ${fields.map((field) => `${field}`).join(', ')}`;

	// SELECTION ID'S
	let tenant: string | undefined = '';
	let client: string | undefined = undefined;
	let property: string | undefined = undefined;
	let unit: string | undefined = undefined;

	// FIELD DISABLING LOGIC
	let isPropertyClicked: boolean = false;
	let isUnitClicked: boolean = false;
	$: isPropertyDisabled = !client;
	$: isUnitDisabled = !property;

	$: if (!client) {
		property = undefined;
		unit = undefined;
	}
	$: if (!property) {
		unit = undefined;
	}
	$: customFields = {
		unit_id: unit,
		tenant_id: tenant,
	};
	// FORM VALIDATION
	let formData: any;
</script>

<div class="max-w-md grid grid-cols-1 gap-8">
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
		}}
		bind:selectedId={tenant}
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
			placeholder: placeholder(['name', 'civil id', 'phone', 'email', 'etc']),
		}}
		bind:selectedId={client}
	/>

	<div
		on:click={() => {
			isPropertyClicked = true;
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
				disabled: isPropertyDisabled,
				warn: isPropertyDisabled && isPropertyClicked,
				warnText: 'Please select a client first',
			}}
			bind:selectedId={property}
			constraint={{ client_id: { _eq: parseInt(client || '') } }}
		/>
	</div>

	<div
		on:click={() => {
			isUnitClicked = true;
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
				disabled: isUnitDisabled,
				warn: isUnitDisabled && isUnitClicked,
				warnText: 'Please select a property first',
			}}
			bind:selectedId={unit}
			constraint={{ property_id: { _eq: parseInt(property || '') } }}
		/>
	</div>

	<FormCS
		{fieldList}
		insertDoc={AddLeaseDocument}
		entity={graphqlName}
		{validation}
		bind:customFields
		bind:formData
	/>
</div>
