<script lang="ts" context="module">
	import TrxColumn from '$components/tenant/TrxColumn.svelte';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import { handleInvite } from '$lib/components/actions/invite';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { getName } from '$lib/utils/common';
	import { Collection, Mail } from '@steeze-ui/heroicons';
	import * as R from 'remeda';
	import type { Load } from './index';

	export const load: Load = async ({ params, fetch }) => {
		const tenant = await trpc(fetch).query('tenants:read', params.id);
		if (tenant) return { props: { tenant } };

		return { error: 'Tenant not found', status: 404 };
	};
</script>

<script lang="ts">
	type Tenant = NonNullable<InferQueryOutput<'tenants:read'>>;
	export let tenant: Tenant;

	const details: [string, string | null][] = [
		['Full Name', getName(tenant, false)],
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

	const transactions = R.flatMap(tenant.leases, (lease) => lease.transactions);
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
<LeaseList leases={tenant.leases} showIndex />
<TrxColumn {transactions} />
