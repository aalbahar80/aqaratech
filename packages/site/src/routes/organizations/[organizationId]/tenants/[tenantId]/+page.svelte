<script lang="ts">
	import { page } from '$app/stores';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import { countries } from '$lib/constants/countries';
	import { toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		['Full Name', data.tenant.fullName],
		['Label', data.tenant.label],
		['Phone', data.tenant.phone],
		['Date of Birth', data.tenant.dob ? toUTCFormat(data.tenant.dob) : ''],
		['Civil id', data.tenant.civilid],
		[
			'Nationality',
			countries.find((c) => c.alpha3Code === data.tenant.nationality)?.name,
		],
		['Passport #', data.tenant.passportNum],
		['Residency #', data.tenant.residencyNum],
		[
			'Residency Expiration',
			data.tenant.residencyEnd ? toUTCFormat(data.tenant.residencyEnd) : '',
		],
	] as [string, string | null][];
</script>

<DetailsPane {details} />

{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
	<MemberList roles={data.roles} />
{/if}

<!-- <LeaseInvoiceList leaseInvoices={data.invoices} /> -->
