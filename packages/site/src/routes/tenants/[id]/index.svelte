<script lang="ts" context="module">
	import { session } from '$app/stores';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import LeaseInvoiceList from '$lib/components/leaseInvoice/LeaseInvoiceList.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import TenantPage from '$lib/components/tenant/TenantPage.svelte';
	import { countries } from '$lib/constants/countries';
	import { toUTCFormat } from '$lib/utils/common';
	import { parseParams } from '$lib/utils/parse-params';
	import { create } from '$lib/utils/route-helpers';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		// TODO handle pagination defaults
		const sParams = parseParams(url);
		const tenantId = params.id;

		const [tenant, leases, invoices, roles] = await Promise.all([
			stuff.api!.tenants.findOne({ id: tenantId }),
			stuff.api!.tenants.findLeases({ id: tenantId }),
			stuff.api!.tenants.findInvoices({ id: tenantId, ...sParams }),
			stuff.api!.tenants.findRoles({ id: tenantId }),
		]);

		return { props: { tenant, leases, invoices, roles } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let tenant: Prop['tenant'];
	export let leases: Prop['leases'];
	export let invoices: Prop['invoices'];
	export let roles: Prop['roles'];

	$: details = [
		['Name', tenant.fullName],
		...(tenant.label ? [['Label', tenant.label]] : []),
		['Label', tenant.label],
		['Phone', tenant.phone],
		['Date of Birth', tenant.dob ? toUTCFormat(tenant.dob) : ''],
		['Civil id', tenant.civilid],
		[
			'Nationality',
			countries.find((c) => c.alpha3Code === tenant.nationality)?.name,
		],
		['Passport #', tenant.passportNum],
		['Residency #', tenant.residencyNum],
		[
			'Residency Expiration',
			tenant.residencyEnd ? toUTCFormat(tenant.residencyEnd) : '',
		],
	] as [string, string | null][];
</script>

<TenantPage {tenant} />

<DetailsPane {details} />

{#if $session.user?.role?.roleType === 'ORGADMIN'}
	<MemberList {roles} />
{/if}

<LeaseList
	{leases}
	formUrl={(function () {
		const base = create({ entity: 'lease' });
		const searchParams = new URLSearchParams({
			tenantId: tenant.id,
		});
		return `${base}?${searchParams.toString()}`;
	})()}
	showIndex
/>

<LeaseInvoiceList leaseInvoices={invoices} />
