<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';
	import {
		Configuration,
		UnitsApi,
	} from '../../../../backend/src/generated/openapi';

	export const load = async ({ session, fetch }: LoadEvent) => {
		const units = await new UnitsApi(
			new Configuration({ fetchApi: fetch }),
		).unitsControllerFindAll(
			{},
			{ headers: { Authorization: `Bearer ${session.accessToken}` } },
		);

		return {
			props: { units },
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let units: Prop['units'];
</script>

<pre>{JSON.stringify(units, null, 2)}</pre>
<!-- <UnitsList {units} /> -->
