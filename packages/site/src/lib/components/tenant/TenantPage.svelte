<script lang="ts">
	import { session } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import LeaseInvoiceList from '$lib/components/leaseInvoice/LeaseInvoiceList.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import { countries } from '$lib/constants/countries';
	import { toUTCFormat } from '$lib/utils/common';
	import { create } from '$lib/utils/route-helpers';
	import type {
		PaginatedLeaseDto,
		PaginatedLeaseInvoiceDto,
		PaginatedRoleDto,
		TenantDto,
	} from '@self/sdk';
	import { Collection } from '@steeze-ui/heroicons';

	export let tenant: TenantDto;
	export let leases: PaginatedLeaseDto;
	export let invoices: PaginatedLeaseInvoiceDto;
	export let roles: PaginatedRoleDto;

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

	const files: [string, string][] = [
		['Civil Id', ''],
		['Passport', ''],
	];
</script>

<Heading title="Tenant" id={tenant.id} entity="tenants">
	<svelte:fragment slot="actions">
		<Button
			icon={Collection}
			text="Tenant Dashboard"
			as="a"
			href={`/portal/tenant/${tenant.id}`}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>
<DetailsPane {details} {files} />
{#if $session.user?.role?.roleType === 'ORGADMIN'}
	<MemberList {roles} />
{/if}
<LeaseList
	{leases}
	formUrl={(function () {
		const base = create({ entity: 'leases' });
		const searchParams = new URLSearchParams({
			tenantId: tenant.id,
		});
		return `${base}?${searchParams.toString()}`;
	})()}
	showIndex
/>
<LeaseInvoiceList leaseInvoices={invoices} />
