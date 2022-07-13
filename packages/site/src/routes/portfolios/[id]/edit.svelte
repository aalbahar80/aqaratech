<script lang="ts" context="module">
	import PortfolioForm from '$lib/components/portfolio/PortfolioForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const portfolio = await stuff.api!.portfolios.findOne({ id: params.id });

		return { props: { portfolio } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolio: Prop['portfolio'];
</script>

<PortfolioForm data={portfolio} />
