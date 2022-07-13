<script context="module" lang="ts">
	import PropertyForm from '$lib/components/property/PropertyForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ stuff }: LoadEvent) => {
		const portfolios = await stuff.api!.portfolios.findAll();
		return { props: { portfolios } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolios: Prop['portfolios'];
</script>

<PropertyForm {portfolios} />
