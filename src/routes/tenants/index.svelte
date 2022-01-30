<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList, graphqlName } from '$lib/definitions/Tenants';
	import { TenantsListDocument } from './[id]/_[id].gql';
</script>

<svelte:head>
	<title>Tenants</title>
</svelte:head>

<TableCS listDoc={TenantsListDocument} {graphqlName} {fieldList} />
