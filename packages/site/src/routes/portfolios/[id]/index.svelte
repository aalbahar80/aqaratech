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

		const [portfolio, properties, roles] = await Promise.all([
			stuff.api!.portfolios.findOne({ id: params.id }),
			stuff.api!.portfolios.findProperties({ id: params.id, ...sParams }),
			// TODO handle pagination & default limit
			stuff.api!.portfolios.findRoles({ id: params.id }),
		]);

		return { props: { portfolio, properties, roles } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolio: Prop['portfolio'];
	export let properties: Prop['properties'];
	export let roles: Prop['roles'];
</script>

<PortfolioPage {portfolio} {properties} {roles} />
