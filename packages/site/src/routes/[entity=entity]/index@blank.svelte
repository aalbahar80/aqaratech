<script lang="ts" context="module">
	import StackedList from '$lib/components/StackedList.svelte';
	import TableParent from '$lib/components/table/TableParent.svelte';
	import type { EntityTitle } from '$lib/models/types/entity.type';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string; entity: EntityTitle }>) => {
		const { page, take, q } = parseParams(url);

		const data = await stuff.api![params.entity].findAll({ page, take, q });
		return { props: { data } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let data: Prop['data'];
</script>

{#if data.results.length}
	<TableParent {data} />
{:else}
	<!-- Only using stacked list for its EmptyState (for now) -->
	<!-- <div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<StackedList count={data.results.length} />
	</div> -->
{/if}
