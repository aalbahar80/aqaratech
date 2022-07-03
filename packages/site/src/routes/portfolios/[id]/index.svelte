<script lang="ts" context="module">
	import PortfolioPage from '$lib/components/portfolio/PortfolioPage.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const [portfolio, properties] = await Promise.all([
			stuff.api!.portfolios.findOne({ id: params.id }),
			stuff.api!.portfolios.findProperties({ id: params.id }),
		]);

		return { props: { portfolio, properties } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolio: Prop['portfolio'];
	export let properties: Prop['properties'];
</script>

<PortfolioPage {portfolio} {properties} />
