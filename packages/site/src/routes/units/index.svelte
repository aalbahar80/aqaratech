<script context="module" lang="ts">
	import { config } from '$lib/client/api-config';
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import { UnitsApi } from '@self/sdk';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ fetch }: LoadEvent) => {
		const data = await new UnitsApi(config(fetch)).unitsControllerFindAll();

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
