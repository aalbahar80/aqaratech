<script lang="ts">
	import { constructFilter } from '$lib/utils/search-utils';
	import { operationStore, query, TypedDocumentNode } from '@urql/svelte';
	import { ComboBox } from 'carbon-components-svelte';
	import type { Field } from '$components/form/Field';
	import type { ComboBoxItem } from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';

	type Hit = {
		id: string | number;
		[key: string]: any;
	};
	type T = $$Generic;
	// type Y = $$Generic<
	// 	{ results: T[] },
	// 	{ limit: number; order_by?: any; where?: any }
	// >;
	export let queryDocument: TypedDocumentNode<T>;
	type A = typeof $result['data'];
	type B = NonNullable<A>['results'][0];
	export let fieldList: Field[];
	export let limit = 4;
	let searchTerm: string;

	$: queryVars = {
		limit,
		where: constructFilter(searchTerm, fieldList),
	};
	const result = operationStore(queryDocument, queryVars);
	// export let display: (hit: B) => string;
	export let display: (hit: B) => ComboBoxItem;
	query(result);
	$: $result.variables = queryVars;
	$: items = $result.data?.results?.map(display) || [];

	// type E = $$Generic;
	// type X = OperationStore<T>['data'];
	// type Y = ReturnType<typeof result>;
	// type Z = ReturnType<typeof result>['data'];

	// type HitCallback = (hit: Hit) => string;

	// export let queryDocument: TypedDocumentNode<
	// 	{ results: Hit[] },
	// 	{ limit: number; order_by?: any; where?: any }
	// >;
	// export let queryDocument: TypedDocumentNode<
	// 	{ results: Hit[] },
	// 	{ limit: number; order_by?: any; where?: any }
	// >;
	// export let queryDocument: TypedDocumentNode;
	// export const hit = (id: number | string) => ({ id });
	// export const display = (hit: OperationStore<T>['data']): string => 2;
</script>

<ComboBox
	bind:value={searchTerm}
	titleText="Tenant"
	placeholder="Type to search by name, civil id, phone, etc"
	size="xl"
	{items}
/>
