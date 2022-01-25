<script lang="ts">
	import { constructFilter } from '$lib/utils/search-utils';
	import {
		OperationStore,
		operationStore,
		query,
		TypedDocumentNode,
	} from '@urql/svelte';
	import { ComboBox } from 'carbon-components-svelte';
	import type { Field } from '$components/form/Field';

	// type Hit = {
	// 	id: string | number;
	// 	[key: string]: any;
	// };
	type T = $$Generic;
	// type E = $$Generic;
	export let queryDocument: TypedDocumentNode<T>;
	type X = OperationStore<T>['data'];
	type Y = ReturnType<typeof result>;
	type A = typeof $result['data'];
	type B = NonNullable<A>['results'][0];
	// type Z = ReturnType<typeof result>['data'];

	// type HitCallback = (hit: Hit) => string;

	// export let queryDocument: TypedDocumentNode<
	// 	{ results: Hit[] },
	// 	{ limit: number; order_by?: any; where?: any }
	// >;
	// export let queryDocument: TypedDocumentNode;
	export let fieldList: Field[];
	export let limit = 4;
	// export const hit = (id: number | string) => ({ id });
	// export const display = (hit: OperationStore<T>['data']): string => 2;

	let searchTerm: string;
	$: queryVars = {
		limit,
		where: constructFilter(searchTerm, fieldList),
	};
	const result = operationStore(queryDocument, queryVars);
	// export const display = (hit): string => 2;
	export let display: (hit: B) => string;
	query(result);
	$: $result.variables = queryVars;
	$: items = $result.data?.results.map(display) || [];
	// $: items =
	// 	$result.data?.results.map((hit) => ({
	// 		id: hit.id.toString(),
	// 		// text: `${hit.first_name} ${hit.last_name}`,
	// 		text: display(hit),
	// 	})) || [];
	// type Z = $$Generic<ReturnType<typeof OperationStore<T>['data']>;
	export let z: A;
</script>

<ComboBox
	bind:value={searchTerm}
	titleText="Tenant"
	placeholder="Type to search by name, civil id, phone, etc"
	size="xl"
	{items}
/>
