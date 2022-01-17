<script lang="ts" context="module">
	// export const prerender = true;
</script>

<script lang="ts">
	import Checked from '$components/indicators/Checked.svelte';
	import Unchecked from '$components/indicators/Unchecked.svelte';

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
>
	<svelte:fragment slot="isPaid" let:cell>
		{#if cell.key === 'is_paid' && cell.value}
			<Checked />
		{:else if cell.key === 'is_paid' && !cell.value}
			<Unchecked />
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</TableCS>
