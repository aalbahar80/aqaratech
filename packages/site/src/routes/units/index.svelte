<script context="module" lang="ts">
	import UnitsList from '$lib/components/unit/UnitsList.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';
	import {
		Configuration,
		UnitsApi,
	} from '../../../../backend/src/generated/openapi';

	export const load = async ({ session, fetch, url }: LoadEvent) => {
		const data = await new UnitsApi(
			new Configuration({ fetchApi: fetch }),
		).unitsControllerFindAll(
			{},
			{ headers: { Authorization: `Bearer ${session.accessToken}` } },
		);

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
