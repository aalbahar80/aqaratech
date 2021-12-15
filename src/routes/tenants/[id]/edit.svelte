<script lang="ts">
	import { page } from '$app/stores';
	import AddGeneric from '$components/AddGeneric.svelte';
	import BreadCrumbs from '$components/BreadCrumbs.svelte';
	import {
		TenantByIdDocument,
		TenantByIdQuery,
		TenantByIdQueryVariables
	} from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';
	import { docs, fieldList } from '../tenants';

	const tenant = operationStore<TenantByIdQuery, TenantByIdQueryVariables>(
		TenantByIdDocument,
		{
			id: parseInt($page.params.id)
		}
	);
	query(tenant);

	$: existing = $tenant?.data?.tenants_by_pk;
	$: crumbData = {
		clientId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.client_id_s,
		propertyId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.property_id,
		unitId: $tenant?.data?.tenants_by_pk?.leases[0]?.unit?.id,
		leaseId: $tenant?.data?.tenants_by_pk?.leases[0]?.id,
		tenantId: $tenant?.data?.tenants_by_pk?.id
	};
</script>

{#if existing}
	<BreadCrumbs {...crumbData} />
	<AddGeneric {fieldList} updateDoc={docs.update} {existing} />
{/if}
