<script context="module" lang="ts">
	import PropertyForm from '$lib/components/property/PropertyForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ stuff, url }: LoadEvent) => {
		const portfolioId = url.searchParams.get('portfolioId');

		const portfolios = await stuff.api!.portfolios.findAll();
		return {
			props: {
				portfolios,
				predefined: { portfolioId },
			},
		};
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolios: Prop['portfolios'];
	export let predefined: Prop['predefined'];
</script>

<PropertyForm {portfolios} {predefined} />
