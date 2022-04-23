<script lang="ts" context="module">
	import TrxColumn from '$components/tenant/TrxColumn.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import LeaseList from '$lib/components/lease/LeaseList.svelte';
	import { getName } from '$lib/utils/common';
	import flatten from 'lodash-es/flatten.js';
	import map from 'lodash-es/map.js';
	import type { Load } from './index';

	export const load: Load = async ({ params }) => {
		const tenant = await trpc.query('tenants:read', params.id);
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
</script>

<Heading title="Tenant" id={tenant.id} entity="tenants" />
<DetailsPane {details} {files} />
<LeaseList leases={tenant.leases} showIndex />
<TrxColumn transactions={flatten(map(tenant.leases, 'transactions'))} />
