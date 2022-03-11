<script lang="ts" context="module">
	import LeasesCard from '$components/tenant/LeasesCard.svelte';
	import TrxColumn from '$components/tenant/TrxColumn.svelte';
	import trpc, { type InferQueryOutput } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { concatIfExists } from '$lib/utils/table-utils';
	import type { Load } from '@sveltejs/kit';
	import flatten from 'lodash-es/flatten.js';
	import map from 'lodash-es/map.js';

	export const load: Load = async ({ params }) => {
		if (params.id === 'add') return { fallthrough: true };

		const tenant = await trpc.query('tenants:read', params.id);
		if (tenant) return { props: { tenant } };

		return { error: 'Tenant not found', status: 404 };
	};
</script>

<script lang="ts">
	type Tenant = NonNullable<InferQueryOutput<'tenants:read'>>;
	export let tenant: Tenant;

	const details: [string, string | null][] = [
		[
			'Full Name',
			concatIfExists([tenant.firstName, tenant.secondName, tenant.lastName]),
		],
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

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<Heading title="Tenant" id={tenant.id} entity="tenants" />
	<DetailsPane {details} {files} />
	<LeasesCard leases={tenant.leases} tenantId={tenant.id} />
	<TrxColumn transactions={flatten(map(tenant.leases, 'transactions'))} />
</div>
