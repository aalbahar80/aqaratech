<script lang="ts" context="module">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import PortfolioPage from '$lib/components/portfolio/PortfolioPage.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
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
				relationKey: 'portfolios',
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

	$: details = [
		...(portfolio.label ? [['Label', portfolio.label]] : []),
		['Name', portfolio.fullName],
		['Label', portfolio.label],
		['Phone', portfolio.phone],
		['Civil ID', portfolio.civilid],
		['Date of birth', portfolio.dob ? toUTCFormat(portfolio.dob) : null],
	] as [string, string | null][];
</script>

<PortfolioPage {portfolio} />
<DetailsPane {details} {files} />
<PropertyList {properties} />
<MemberList {roles} />
