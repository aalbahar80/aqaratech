<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Units';
	import { UnitListPageDocument } from './_index.gql';
</script>

<svelte:head>
	<title>Units</title>
</svelte:head>

<TableCS listDoc={UnitListPageDocument} graphqlName="units" {fieldList} />
