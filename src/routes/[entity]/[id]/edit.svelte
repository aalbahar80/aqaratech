<script lang="ts">
	import { page } from '$app/stores';
	import AddGeneric from '$components/AddGeneric.svelte';
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import { onMount } from 'svelte';

	import {
		TenantByIdDocument,
		TenantByIdQuery,
		TenantByIdQueryVariables
	} from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';

	// const tenant = operationStore<TenantByIdQuery, TenantByIdQueryVariables>(
	// 	TenantByIdDocument,
	// 	{
	// 		id: parseInt($page.params.id)
	// 	}
	// );
	// query(tenant);

	$: existing = $tenant?.data?.tenants_by_pk;
	// $: crumbData = {
	// 	clientId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.client_id_s,
	// 	propertyId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.property_id,
	// 	unitId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.id,
	// 	leaseId: $tenant?.data?.tenants_by_pk?.leases[0]?.id,
	// 	tenantId: $tenant?.data?.tenants_by_pk?.id
	// };

	let _entity, docs, title, graphQlName, fieldList;
	const entity = $page.path.split('/')[1];
	const path = `../${entity}/${entity}`;
	onMount(async () => {
		_entity = (await import(path)).default;
		({ docs, title, graphQlName, fieldList } = _entity);
	});
</script>

dfjj

{#if _entity}
	<!-- <BreadCrumbs {...crumbData} /> -->
	<AddGeneric
		{fieldList}
		{graphQlName}
		updateDoc={docs.update}
		byIdDoc={docs.byId}
		{existing}
	/>
{/if}
