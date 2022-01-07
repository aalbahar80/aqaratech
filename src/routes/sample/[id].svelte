<script lang="ts">
	import { page } from '$app/stores';
	import {
		Trx2ByIdQuery,
		Trx2ByIdQueryVariables,
		Trx2ByIdDocument,
	} from '$generated/graphql';
	import { operationStore, query } from '@urql/svelte';

	const trx2 = operationStore<Trx2ByIdQuery, Trx2ByIdQueryVariables>(
		Trx2ByIdDocument,
		{
			id: parseInt($page.params.id),
		},
	);
	query(trx2);
</script>

{JSON.stringify($page.params)}
{JSON.stringify($trx2)}

<a href={`/transactions`}>go deep</a>
