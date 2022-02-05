<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Leases';
</script>

<svelte:head>
	<title>Leases</title>
</svelte:head>

<TableCS listDoc={LeaseListPageDocument} graphqlName="leases" {fieldList} />
