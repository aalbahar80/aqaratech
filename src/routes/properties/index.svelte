<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Properties';
</script>

<svelte:head>
	<title>Properties</title>
</svelte:head>

<TableCS
	listDoc={PropertyListPageDocument}
	graphqlName="properties"
	{fieldList}
/>
