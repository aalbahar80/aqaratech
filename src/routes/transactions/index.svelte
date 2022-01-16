<script lang="ts" context="module">
	// export const prerender = true;
</script>

<script lang="ts">
	import TableCS from '$components/table/TableCS.svelte';
	import { fieldList } from '$lib/definitions/Transactions';
	import { TransactionListPageDocument } from './_index.gql';
</script>

<svelte:head>
	<title>Transactions</title>
</svelte:head>

<TableCS
	listDoc={TransactionListPageDocument}
	graphqlName="transactions"
	{fieldList}
/>
