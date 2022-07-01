<script lang="ts" context="module">
	import UnitPage from '$lib/components/unit/UnitPage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const [unit, leases] = await Promise.all([
			stuff.api!.units.findOne({ id: params.id }),
			stuff.api!.units.findLeases({ id: params.id }),
		]);

		return { props: { unit, leases } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let unit: Prop['unit'];
	export let leases: Prop['leases'];
</script>

<UnitPage {unit} leases={leases.results} />
