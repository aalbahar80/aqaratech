<script lang="ts">
	import { constructFilter } from '$lib/utils/search-utils';
	import { operationStore, query, TypedDocumentNode } from '@urql/svelte';
	import { ComboBox } from 'carbon-components-svelte';
	import type { Field } from '$components/form/Field';

	export let queryDocument: TypedDocumentNode<
		{ results: any[] },
		{ limit: number; order_by?: any; where?: any }
	>;
	// export let queryDocument: TypedDocumentNode;
	export let fieldList: Field[];
	export let limit = 4;

	let searchTerm: string;
	$: queryVars = {
		limit,
		where: constructFilter(searchTerm, fieldList),
	};
	const result = operationStore(queryDocument, queryVars);
	query(result);
	$: $result.variables = queryVars;
	$: items =
		$result.data?.results.map((hit) => ({
			id: hit.id.toString(),
			text: `${hit.first_name} ${hit.last_name}`,
		})) || [];
</script>

<ComboBox
	bind:value={searchTerm}
	titleText="Tenant"
	placeholder="Type to search by name, civil id, phone, etc"
	size="xl"
	{items}
/>
