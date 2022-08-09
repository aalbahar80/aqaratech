<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import { create } from '$lib/utils/route-helpers';
	import { MenuItem } from '@rgossiaux/svelte-headlessui';
	import type {
		PaginatedFileDto,
		PaginatedPropertyDto,
		PaginatedRoleDto,
		PortfolioDto,
	} from '@self/sdk';
	import { PresentationChartBar } from '@steeze-ui/heroicons';
	import HeroiconsSolidCreditCard from '~icons/heroicons-solid/credit-card';

	export let portfolio: PortfolioDto;
	export let properties: PaginatedPropertyDto;
	export let roles: PaginatedRoleDto;
	export let files: PaginatedFileDto;

	$: details = [
		...(portfolio.label ? [['Label', portfolio.label]] : []),
		['Name', portfolio.fullName],
		['Label', portfolio.label],
		['Phone', portfolio.phone],
		['Civil ID', portfolio.civilid],
		['Date of birth', portfolio.dob ? toUTCFormat(portfolio.dob) : null],
	] as [string, string | null][];
</script>

<Heading title="Portfolio" id={portfolio.id} entity="portfolios">
	<div slot="menu-items">
		<MenuItem as="div" let:active>
			<a
				href={create({
					entity: 'expenses',
					predefined: new Map([['portfolioId', portfolio.id]]),
				})}
			>
				<MenuItemChild {active}>
					<MenuItemIcon icon={HeroiconsSolidCreditCard} />
					Create expense
				</MenuItemChild>
			</a>
		</MenuItem>
	</div>
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
<DetailsPane {details} {files} />
<PropertyList {properties} />
<MemberList {roles} />
