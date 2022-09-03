<script lang="ts">
	import { page } from '$app/stores';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import LeaseInvoiceList from '$lib/components/leaseInvoice/LeaseInvoiceList.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import TenantPage from '$lib/components/tenant/TenantPage.svelte';
	import { countries } from '$lib/constants/countries';
	import { toUTCFormat } from '$lib/utils/common';
	import { create } from '$lib/utils/route-helpers';
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

<TenantPage tenant={data.tenant} />

<DetailsPane {details} />

{#if $page.data.user?.role?.roleType === 'ORGADMIN'}
	<MemberList roles={data.roles} />
{/if}

<LeaseList
	leases={data.leases}
	formUrl={(function () {
		const base = create({ entity: 'lease' });
		const searchParams = new URLSearchParams({
			tenantId: data.tenant.id,
		});
		return `${base}?${searchParams.toString()}`;
	})()}
	showIndex
/>

<LeaseInvoiceList leaseInvoices={data.invoices} />
