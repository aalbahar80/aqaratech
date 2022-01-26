<script lang="ts">
	import type { Field } from '$components/form/Field';
	import { constructFilter } from '$lib/utils/search-utils';
	import { operationStore, query, type TypedDocumentNode } from '@urql/svelte';
	import ComboBox from 'carbon-components-svelte/src/ComboBox/ComboBox.svelte';
	import type {
		ComboBoxItem,
		ComboBoxProps,
	} from 'carbon-components-svelte/types/ComboBox/ComboBox.svelte';

	type Q = $$Generic<{ results: any[] }>;
	type A = typeof $result['data'];
	type B = NonNullable<A>['results'];
	type Flatten<G> = G extends Array<infer U> ? U : G;
	type C = Flatten<B>;
	type QueryVars = {
		limit: number;
		order_by?: any;
		where?: any;
	};

	export let queryDocument: TypedDocumentNode<Q, QueryVars>;
	export let fieldList: Field[];
	export let limit = 10;
	export let comboBoxProps: Pick<
		ComboBoxProps,
		'titleText' | 'placeholder' | 'disabled' | 'warn' | 'warnText'
	>;
	export let selectedId: string | undefined = undefined;

	let searchTerm: string;

	let queryVars: QueryVars;
	$: queryVars = {
		limit,
		where: constructFilter(searchTerm, fieldList),
	};
	const result = operationStore(queryDocument, queryVars);
	export let display: (hit: C) => ComboBoxItem & { id: string };
	query(result);
	$: $result.variables = queryVars;
	$: items = $result.data?.results?.map(display) || [];
</script>

<ComboBox
	bind:value={searchTerm}
	bind:selectedId
	size="xl"
	{items}
	{...comboBoxProps}
/>
