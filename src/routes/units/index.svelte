<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Units';
</script>

<svelte:head>
	<title>Units</title>
</svelte:head>

<TableCS listDoc={UnitListPageDocument} graphqlName="units" {fieldList} />
