<script lang="ts" context="module">
	import UnitForm from '$lib/components/unit/UnitForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const unit = await stuff.api!.units.findOne({ id: params.id });

		return { props: { unit } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let unit: Prop['unit'];
</script>

<UnitForm data={unit} formType="update" />
