<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import SearchBox from '$components/form/SearchBox.svelte';
	import { fieldList, graphqlName, validation } from '$lib/definitions/Leases';
	import { fieldList as clientFieldList } from '$lib/definitions/Clients';
	import { fieldList as tenantFieldList } from '$lib/definitions/Tenants';
	import { fieldList as propertyFieldList } from '$lib/definitions/Properties';
	import {
		AddLeaseDocument,
		ClientComboBoxDocument,
		PropertyComboBoxDocument,
		TenantComboBoxDocument,
	} from './_add.gql';
</script>

<div class="max-w-md grid grid-cols-1 gap-8">
	<SearchBox
		queryDocument={TenantComboBoxDocument}
		fieldList={tenantFieldList}
		display={(hit) => ({
			id: hit.id,
			text: `${hit.first_name} ${hit.last_name}`,
		})}
	/>

	<SearchBox
		queryDocument={ClientComboBoxDocument}
		fieldList={clientFieldList}
		display={(hit) => ({
			id: hit.id,
			text: `${hit.first_name} ${hit.last_name}`,
		})}
	/>

	<SearchBox
		queryDocument={PropertyComboBoxDocument}
		fieldList={propertyFieldList}
		display={(hit) => ({
			id: hit.id,
			text: `${hit.area} ${hit.block}`,
		})}
	/>

	<FormCS
		{fieldList}
		insertDoc={AddLeaseDocument}
		entity={graphqlName}
		{validation}
	/>
</div>
