<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList, graphqlName } from '$lib/definitions/Tenants';
</script>

<svelte:head>
	<title>Tenants</title>
</svelte:head>

<TableCS listDoc={TenantsListDocument} {graphqlName} {fieldList} />
