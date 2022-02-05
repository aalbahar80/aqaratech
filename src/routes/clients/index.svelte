<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Clients';
</script>

<svelte:head>
	<title>Clients</title>
</svelte:head>

<TableCS listDoc={ClientListPageDocument} graphqlName="clients" {fieldList} />
