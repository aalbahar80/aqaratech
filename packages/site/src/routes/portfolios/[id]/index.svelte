<script lang="ts" context="module">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import { trpc } from '$lib/client/trpc';
	import { handleInvite } from '$lib/components/actions/invite';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { Mail, PresentationChartBar } from '@steeze-ui/heroicons';
	import type { Load } from './__types/index';

	export const load: Load = async ({ params, fetch }) => {
		if (params.id === 'add') return { fallthrough: true };
		const portfolio = await trpc(fetch).query('portfolios:read', params.id);
		return { props: { portfolio } };
	};
</script>

<script lang="ts">
	type Portfolio = InferQueryOutput<'portfolios:read'>;
	export let portfolio: Portfolio;

	let details: [string, string | null][];
	$: details = [
		['Name', portfolio.fullName],
		['Phone', portfolio.phone],
		['Email', portfolio.email],
		['Civil ID', portfolio.civilid],
		['Date of birth', portfolio.dob ? toUTCFormat(portfolio.dob) : null],
	];
</script>

<Heading title="Portfolio" id={portfolio.id} entity="portfolios">
	<svelte:fragment slot="actions">
		<Button
			icon={PresentationChartBar}
			text="Dashboard"
			as="a"
			href={`/portfolios/${portfolio.id}/dashboard`}
			class="w-full sm:w-auto"
			prefetch
		/>
		<AsyncButton
			func={() => handleInvite(portfolio.id, 'propertyOwner')}
			let:loading
		>
			<Button
				as="div"
				{loading}
				icon={Mail}
				solid
				text="Invite"
				class="w-full sm:w-auto"
			/></AsyncButton
		>
	</svelte:fragment>
</Heading>
<DetailsPane {details} />
<PropertyList properties={portfolio.properties} />
