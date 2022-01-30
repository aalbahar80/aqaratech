<script lang="ts" context="module">
	// TODO remove prerender
	export const prerender = true;
</script>

<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Properties';
	import { PropertyListPageDocument } from './_index.gql';
</script>

<svelte:head>
	<title>Properties</title>
</svelte:head>

<TableCS
	listDoc={PropertyListPageDocument}
	graphqlName="properties"
	{fieldList}
/>
