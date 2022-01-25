<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import SearchBox from '$components/form/SearchBox.svelte';
	import { fieldList as clientFieldList } from '$lib/definitions/Clients';
	import { fieldList, graphqlName, validation } from '$lib/definitions/Leases';
	import { fieldList as tenantFieldList } from '$lib/definitions/Tenants';
	import {
		AddLeaseDocument,
		ClientComboBoxDocument,
		TenantComboBoxDocument,
	} from './_add.gql';
</script>

<div class="max-w-md grid grid-cols-1 gap-8">
	<SearchBox
		queryDocument={TenantComboBoxDocument}
		fieldList={tenantFieldList}
		display={(hit) => `${hit.results[0].first_name} ${hit} ${hit?.last_name}`}
	/>

	<SearchBox
		queryDocument={ClientComboBoxDocument}
		fieldList={clientFieldList}
	/>

	<FormCS
		{fieldList}
		insertDoc={AddLeaseDocument}
		entity={graphqlName}
		{validation}
	/>
</div>
