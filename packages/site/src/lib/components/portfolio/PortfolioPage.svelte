<script lang="ts">
	import { handleInvite } from '$lib/components/actions/invite';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { PaginatedPropertyDto, PortfolioDto } from '@self/sdk';
	import { Mail, PresentationChartBar } from '@steeze-ui/heroicons';

	export let portfolio: PortfolioDto;
	export let properties: PaginatedPropertyDto;

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
<PropertyList {properties} />
