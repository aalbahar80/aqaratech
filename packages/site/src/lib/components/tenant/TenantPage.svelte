<script lang="ts">
	import TrxColumn from '$components/tenant/TrxColumn.svelte';
	import { handleInvite } from '$lib/components/actions/invite';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import type {
		LeaseInvoiceDto,
		PaginatedLeaseDto,
		PaginatedLeaseInvoiceDto,
		TenantDto,
	} from '@self/sdk';
	import { Collection, Mail } from '@steeze-ui/heroicons';

	export let tenant: TenantDto;
	export let leases: PaginatedLeaseDto;
	export let invoices: PaginatedLeaseInvoiceDto;

	const details: [string, string | null][] = [
		['Full Name', tenant.fullName],
		['Phone', tenant.phone],
		['Email', tenant.email],
		['Civil id', tenant.civilid],
		['Passport #', tenant.passportNum],
		['Residency #', tenant.residencyNum],
		['Residency Expiration', tenant.residencyEnd?.toLocaleDateString() ?? ''],
		['Nationality', tenant.nationality],
	];

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
		<AsyncButton func={() => handleInvite(tenant.id, 'tenant')} let:loading>
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
<DetailsPane {details} {files} />
<LeaseList {leases} showIndex />
<!-- <TrxColumn transactions={invoices.results} /> -->
