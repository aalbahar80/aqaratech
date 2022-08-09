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
		const id = params.id;

		const [portfolio, properties, roles, files] = await Promise.all([
			stuff.api!.portfolios.findOne({ id }),
			stuff.api!.portfolios.findProperties({ id, ...sParams }),
			// TODO handle pagination & default limit
			stuff.api!.portfolios.findRoles({ id }),
			stuff.api!.files.findAll({
				relationKey: 'portfolioId',
				relationValue: id,
			}),
		]);

		return { props: { portfolio, properties, roles, files } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let portfolio: Prop['portfolio'];
	export let properties: Prop['properties'];
	export let roles: Prop['roles'];
	export let files: Prop['files'];
</script>

<PortfolioPage {portfolio} {properties} {roles} {files} />
