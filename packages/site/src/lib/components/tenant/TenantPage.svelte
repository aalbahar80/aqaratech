<script lang="ts">
	import TrxColumn from '$components/tenant/TrxColumn.svelte';
	import { handleInvite } from '$lib/components/actions/invite';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import type { TenantOneDto } from '@self/sdk';
	import { Collection, Mail } from '@steeze-ui/heroicons';
	import * as R from 'remeda';

	export let data: TenantOneDto;

	const details: [string, string | null][] = [
		['Full Name', data.fullName],
		['Phone', data.phone],
		['Email', data.email],
		['Civil id', data.civilid],
		['Passport #', data.passportNum],
		['Residency #', data.residencyNum],
		['Residency Expiration', data.residencyEnd?.toLocaleDateString() ?? ''],
		['Nationality', data.nationality],
	];

	const files: [string, string][] = [
		['Civil Id', ''],
		['Passport', ''],
	];

	const transactions = R.flatMap(data.leases, (lease) => lease.transactions);
</script>

<Heading title="Tenant" id={data.id} entity="tenants">
	<svelte:fragment slot="actions">
		<Button
			icon={Collection}
			text="Tenant Dashboard"
			as="a"
			href={`/portal/tenant/${data.id}`}
			class="w-full sm:w-auto"
			prefetch
		/>
		<AsyncButton func={() => handleInvite(data.id, 'tenant')} let:loading>
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
<LeaseList leases={data.leases} showIndex />
<TrxColumn {transactions} />
