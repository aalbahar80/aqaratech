<script lang="ts" context="module">
	export const prerender = true;
</script>

<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { tenants } from '$lib/definitions/ref';
	import { TenantsListDocument } from './[id]/_[id].gql';

	const { fieldList, graphqlName } = tenants;
</script>

<svelte:head>
	<title>Tenants</title>
</svelte:head>

<TableCS listDoc={TenantsListDocument} {graphqlName} {fieldList} />
