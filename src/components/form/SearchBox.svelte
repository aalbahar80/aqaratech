<script lang="ts">
	import { constructFilter } from '$lib/utils/search-utils';
	import { operationStore, query, TypedDocumentNode } from '@urql/svelte';
	import { ComboBox } from 'carbon-components-svelte';
	import type { Field } from '$components/form/Field';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';

	type T = $$Generic;
	// TODO add a generic constraint to query document, make sure it has key results with value []
	// combine the below with the above
	// export let queryDocument: TypedDocumentNode<
	//   { results: [] },
	//   { limit: number; order_by?: any; where?: any }
	// >;
	type A = typeof $result['data'];
	type B = NonNullable<A>['results'];
	type Flatten<G> = G extends Array<infer U> ? U : G;
	type C = Flatten<B>;

	export let queryDocument: TypedDocumentNode<T>;
	export let fieldList: Field[];
	export let limit = 4;
	let searchTerm: string;

	$: queryVars = {
		limit,
		where: constructFilter(searchTerm, fieldList),
	};
	const result = operationStore(queryDocument, queryVars);
	export let display: (hit: C) => ComboBoxItem;
	query(result);
	$: $result.variables = queryVars;
	$: items = $result.data?.results?.map(display) || [];
</script>

<ComboBox
	bind:value={searchTerm}
	titleText="Tenant"
	placeholder="Type to search by name, civil id, phone, etc"
	size="xl"
	{items}
/>
