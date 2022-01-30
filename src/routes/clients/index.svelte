<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Clients';
	import { ClientListPageDocument } from './_index.gql';
</script>

<svelte:head>
	<title>Clients</title>
</svelte:head>

<TableCS listDoc={ClientListPageDocument} graphqlName="clients" {fieldList} />
