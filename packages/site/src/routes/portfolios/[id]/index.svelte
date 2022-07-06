<script lang="ts" context="module">
	import PortfolioPage from '$lib/components/portfolio/PortfolioPage.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const sParams = parseParams(url);

		const [portfolio, properties] = await Promise.all([
			stuff.api!.portfolios.findOne({ id: params.id }),
			stuff.api!.portfolios.findProperties({ id: params.id, ...sParams }),
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
