<script context="module" lang="ts">
	import { trpc } from '$lib/client/trpc';
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import type { Predefined } from '$models/interfaces/lease.interface';
	import type { Load } from '@sveltejs/kit';
	import { Client } from '../../lib/models/classes/client.class';
	import { Property } from '../../lib/models/classes/property.class';
	import { Tenant } from '../../lib/models/classes/tenant.class';
	import { Unit } from '../../lib/models/classes/unit.class';

	export const load: Load = async ({ url, fetch }) => {
		let options = Object.fromEntries(url.searchParams.entries());
		let predefined: Predefined | undefined;

		if (options.leaseId) {
			// renewing
			const lease = await trpc(fetch).query('leases:read', options.leaseId);
			predefined = {
				initiator: 'lease',
				tenantId: lease.tenantId,
				firstName: lease.tenant.firstName,
				lastName: lease.tenant.lastName,
				unitId: lease.unitId,
				unitType: lease.unit.type,
				unitNumber: lease.unit.unitNumber,
				propertyId: lease.unit.property.id,
				address: Property.getLabel(lease.unit.property),
				monthlyRent: lease.monthlyRent,
				tenant: {
					label: Tenant.getLabel(lease.tenant),
					value: lease.tenantId,
				},
				client: {
					label: Client.getLabel(lease.unit.property.client),
					value: lease.unit.property.client.id,
				},
				property: {
					label: Property.getLabel(lease.unit.property),
					value: lease.unit.property.id,
				},
				unit: {
					label: Unit.getLabel(lease.unit),
					value: lease.unitId,
				},
			};
		} else if (options.tenantId) {
			const tenant = await trpc(fetch).query('tenants:read', options.tenantId);
			predefined = {
				initiator: 'tenant',
				tenantId: tenant.id,
				firstName: tenant.firstName,
				lastName: tenant.lastName,
				tenant: {
					label: Tenant.getLabel(tenant),
					value: tenant.id,
				},
				client: undefined,
				property: undefined,
				unit: undefined,
			};
		} else if (options.unitId) {
			const unit = await trpc(fetch).query('units:read', options.unitId);
			predefined = {
				initiator: 'unit',
				unitId: unit.id,
				unitType: unit.type,
				unitNumber: unit.unitNumber,
				propertyId: unit.propertyId,
				address: Property.getLabel(unit.property),
				tenant: undefined,
				client: {
					label: Client.getLabel(unit.property.client),
					value: unit.property.client.id,
				},
				property: {
					label: Property.getLabel(unit.property),
					value: unit.property.id,
				},
				unit: {
					label: Unit.getLabel(unit),
					value: unit.id,
				},
			};
		}
		return {
			props: { predefined },
		};
	};
</script>

<script lang="ts">
	export let predefined: Predefined;
</script>

<svelte:head>
	<title>{`New Lease`}</title>
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
