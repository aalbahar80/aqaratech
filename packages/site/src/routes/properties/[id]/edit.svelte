<script lang="ts" context="module">
	import PropertyForm from '$lib/components/property/PropertyForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const property = await stuff.api!.properties.findOne({ id: params.id });

		return { props: { property } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let property: Prop['property'];
</script>

<PropertyForm formType="update" data={property} />
