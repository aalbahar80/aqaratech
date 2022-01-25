<script lang="ts">
	import FormCS from '$components/form/FormCS.svelte';
	import { fieldList, validation, graphqlName } from '$lib/definitions/Leases';
	import { constructFilter } from '$lib/utils/search-utils';
	import { operationStore, query } from '@urql/svelte';
	import { ComboBox } from 'carbon-components-svelte';
	import { AddLeaseDocument, TenantComboBoxDocument } from './_add.gql';
	import { fieldList as tenantFieldList } from '$lib/definitions/Tenants';
	import { addToast } from '$lib/stores/toast';

	let tenantSearchTerm: string;
	$: tenantQueryVars = {
		tenant_limit: 5,
		tenant_where: constructFilter(tenantSearchTerm, tenantFieldList),
	};
	const tenants = operationStore(TenantComboBoxDocument, tenantQueryVars);
	query(tenants);
	$: $tenants.variables = tenantQueryVars;
	$: tenantItems =
		$tenants.data?.tenants.map((tenant) => ({
			id: tenant.id.toString(),
			text: `${tenant.first_name} ${tenant.last_name}`,
		})) || [];

	let tenantInput: HTMLInputElement;
</script>

<div class="max-w-md grid grid-cols-1 gap-8">
	<ComboBox
		bind:value={tenantSearchTerm}
		titleText="Tenant"
		placeholder="Type to search by name, civil id, phone, etc"
		size="xl"
		items={tenantItems}
		ref={tenantInput}
		on:scroll={(e) => {
			document?.activeElement?.blur();
		}}
	/>

	<ComboBox
		titleText="Unit"
		placeholder="Select unit"
		size="xl"
		items={[
			{ id: '0', text: 'Slack' },
			{ id: '1', text: 'Email' },
			{ id: '2', text: 'Fax' },
		]}
	/>

	<FormCS
		{fieldList}
		insertDoc={AddLeaseDocument}
		entity={graphqlName}
		{validation}
	/>
</div>
