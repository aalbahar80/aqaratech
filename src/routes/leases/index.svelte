<script lang="ts" context="module">
	// export const prerender = true;
</script>

<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Leases';
	import { LeaseListPageDocument } from './_index.gql';
</script>

<svelte:head>
	<title>Leases</title>
</svelte:head>

<TableCS listDoc={LeaseListPageDocument} graphqlName="leases" {fieldList} />
