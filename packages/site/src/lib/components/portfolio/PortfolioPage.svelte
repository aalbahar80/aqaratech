<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import RoleList from '$lib/components/role/RoleList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type {
		PaginatedPropertyDto,
		PaginatedRoleDto,
		PortfolioDto,
	} from '@self/sdk';
	import { CreditCard, PresentationChartBar } from '@steeze-ui/heroicons';

	export let portfolio: PortfolioDto;
	export let properties: PaginatedPropertyDto;
	export let roles: PaginatedRoleDto;

	$: details = [
		['Name', portfolio.fullName],
		['Phone', portfolio.phone],
		['Civil ID', portfolio.civilid],
		['Date of birth', portfolio.dob ? toUTCFormat(portfolio.dob) : null],
	] as [string, string | null][];
</script>

<Heading
	title="Portfolio"
	id={portfolio.id}
	entity="portfolios"
	extraMenuItems={[
		{
			icon: CreditCard,
			label: 'Create expense',
			href: `/expenses/new?portfolioId=${portfolio.id}`,
		},
	]}
>
	<svelte:fragment slot="actions">
		<Button
			icon={PresentationChartBar}
			text="Dashboard"
			as="a"
			href={`/portfolios/${portfolio.id}/dashboard`}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>
<DetailsPane {details} />
<PropertyList {properties} />
<RoleList {roles} />
