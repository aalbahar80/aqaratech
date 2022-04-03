<script context="module" lang="ts">
	import trpc from '$lib/client/trpc';
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import { singular } from '$lib/definitions/index';
	import type { Predefined } from '$lib/definitions/lease';
	import { getAddress } from '$lib/definitions/property';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url }) => {
		let options = Object.fromEntries(url.searchParams.entries());
		let predefined: Predefined | undefined;

		if (options.leaseId) {
			// renewing
			const lease = await trpc.query('leases:read', options.leaseId);
			predefined = {
				initiator: 'lease',
				tenantId: lease.tenantId,
				firstName: lease.tenant.firstName,
				lastName: lease.tenant.lastName,
				unitId: lease.unitId,
				unitNumber: lease.unit.unitNumber,
				propertyId: lease.unit.property.id,
				address: getAddress(lease.unit.property),
				monthlyRent: lease.monthlyRent,
			};
		} else if (options.tenantId) {
			const tenant = await trpc.query('tenants:read', options.tenantId);
			predefined = {
				initiator: 'tenant',
				tenantId: tenant.id,
				firstName: tenant.firstName,
				lastName: tenant.lastName,
			};
		} else if (options.unitId) {
			const unit = await trpc.query('units:read', options.unitId);
			predefined = {
				initiator: 'unit',
				unitId: unit.id,
				unitNumber: unit.unitNumber,
				propertyId: unit.propertyId,
				address: getAddress(unit.property),
			};
		}
		return {
			props: { predefined },
		};
	};
</script>

<script lang="ts">
	export let predefined: Predefined;
	const entity = 'leases';
</script>

<svelte:head>
	<title>{`New ${singular[entity]}`}</title>
</svelte:head>
<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="min-w-0 flex-1">
		<h2
			class="pb-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:pb-6 sm:text-3xl"
		>
			New Lease
		</h2>
	</div>
	<LeaseForm {predefined} />
</div>
