<script lang="ts">
	// import Toy from '@leveluptuts/svelte-toy/src/lib/Toy.svelte';
	// import Toy from '@leveluptuts/svelte-toy';
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

	let client: string;
	let property: string;
</script>

<!-- <Toy register={[{ client }]} /> -->

<div class="max-w-md grid grid-cols-1 gap-8">
	<SearchBox
		queryDocument={TenantComboBoxDocument}
		fieldList={tenantFieldList}
		display={(hit) => ({
			id: hit.id.toString(),
			text: `${hit.first_name} ${hit.last_name}`,
		})}
		comboBoxProps={{
			titleText: 'Tenant',
			placeholder: 'Type to search by name, civil id, phone, etc',
		}}
	/>

	<SearchBox
		queryDocument={ClientComboBoxDocument}
		fieldList={clientFieldList}
		display={(hit) => ({
			id: hit.id.toString(),
			text: `${hit.first_name} ${hit.last_name}`,
		})}
		comboBoxProps={{
			titleText: 'Client',
			placeholder: placeholder(['name', 'civil id', 'phone', 'email', 'etc']),
		}}
		bind:selectedId={client}
	/>

	<SearchBox
		queryDocument={PropertyComboBoxDocument}
		fieldList={propertyFieldList}
		display={(hit) => ({
			id: hit.id.toString(),
			text: `${hit.area} ${hit.block}`,
		})}
		comboBoxProps={{
			titleText: 'Propety',
			placeholder: placeholder(['address']),
			disabled: !client,
		}}
		bind:selectedId={property}
	/>

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
			disabled: !property,
		}}
	/>

	<FormCS
		{fieldList}
		insertDoc={AddLeaseDocument}
		entity={graphqlName}
		{validation}
	/>
</div>
