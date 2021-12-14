<script lang="ts">
	import { page } from '$app/stores';
	import {
		TrxByIdQuery,
		TrxByIdQueryVariables,
		TrxByIdDocument
	} from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';

	const trx = operationStore<TrxByIdQuery, TrxByIdQueryVariables>(
		TrxByIdDocument,
		{
			id: parseInt($page.params.id)
		}
	);
	query(trx);
</script>

{JSON.stringify($page.params)}
{JSON.stringify($trx)}
<!-- {console.log($trx)} -->

<a href={`/sample/${$trx.data?.transactions_by_pk.id}`}>go deep</a>
