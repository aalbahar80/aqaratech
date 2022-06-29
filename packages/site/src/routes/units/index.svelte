<script context="module" lang="ts">
	import { api } from '$lib/client/api';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ fetch }: LoadEvent) => {
		const data = await api(fetch).units.findAllUnits();

		return {
			props: { data },
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let data: Prop['data'];
</script>

<UnitsList units={data.results || []} />
