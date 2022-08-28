<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import PayoutList from '$lib/components/payout/PayoutList.svelte';
	import PortfolioPage from '$lib/components/portfolio/PortfolioPage.svelte';
	import PropertyList from '$lib/components/property/PropertyList.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		...(data.portfolio.label ? [['Label', data.portfolio.label]] : []),
		['Name', data.portfolio.fullName],
		['Label', data.portfolio.label],
		['Phone', data.portfolio.phone],
		['Civil ID', data.portfolio.civilid],
		[
			'Date of birth',
			data.portfolio.dob ? toUTCFormat(data.portfolio.dob) : null,
		],
	] as [string, string | null][];
</script>

<PortfolioPage portfolio={data.portfolio} />
<DetailsPane {details} />
<PropertyList properties={data.properties} />
<PayoutList payouts={data.payouts} />
<MemberList roles={data.roles} />
