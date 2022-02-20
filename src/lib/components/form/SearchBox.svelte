<!-- <script lang="ts">
	import type { Field } from '$components/form/Field';
	import { constructFilter } from '$lib/utils/search-utils';

	type Q = $$Generic<{ results: any[] }>;
	type V = $$Generic;
	type A = typeof $result['data'];
	type B = NonNullable<A>['results'];
	type Flatten<G> = G extends Array<infer U> ? U : G;
	type C = Flatten<B>;
	interface QueryVars {
		limit?: any;
		where?: any;
		order_by?: any;
	}

	export let queryDocument: TypedDocumentNode<Q, V>;
	export let constraint: V['where'] | undefined = undefined;
	export let fieldList: Field[];
	export let limit = 10;
	export let comboBoxProps: Pick<
		ComboBoxProps,
		| 'titleText'
		| 'placeholder'
		| 'disabled'
		| 'warn'
		| 'warnText'
		| 'id'
		| 'invalid'
		| 'invalidText'
		| 'name'
	>;
	export let selectedId: string | undefined = undefined;

	let searchTerm: string = '';

	let queryVars: QueryVars;
	$: filter = constraint
		? {
				_and: {
					...constraint,
					...constructFilter(searchTerm, fieldList),
				},
		  }
		: constructFilter(searchTerm, fieldList);
	$: queryVars = {
		limit,
		where: filter,
	};
	const result = operationStore(queryDocument, constraint);
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
/> -->
