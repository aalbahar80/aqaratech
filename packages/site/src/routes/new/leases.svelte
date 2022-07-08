<script context="module" lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import type { Predefined } from '$models/interfaces/lease.interface';
	import type { Load } from '@sveltejs/kit';
	import { Property } from '../../lib/models/classes/property.class';
	import { Unit } from '../../lib/models/classes/unit.class';

	export const load: Load = async ({ url, stuff }) => {
		let options = Object.fromEntries(url.searchParams.entries());
		let predefined: Predefined | undefined;

		// if (options.leaseId) {
		// 	// renewing
		// 	// const lease = await trpc(fetch).query('leases:read', options.leaseId);
		// 	const lease = await stuff.api!.leases.findOne({ id: options.leaseId });
		// 	predefined = {
		// 		initiator: 'lease',
		// 		tenantId: lease.tenantId,
		// 		fullName: lease.ext.tenantName,
		// 		unitId: lease.unitId,
		// 		unitLabel: lease.ext.unitLabel,
		// 		// unitType: lease.unit.type,
		// 		// unitNumber: lease.unit.unitNumber,
		// 		// propertyId: lease.unit.property.id,
		// 		propertyId: lease.breadcrumbs.property.
		// 		address: Property.getLabel(lease.unit.property),
		// 		monthlyRent: lease.monthlyRent,
		// 		tenant: {
		// 			label: lease.tenant.shortName || lease.tenant.fullName,
		// 			value: lease.tenantId,
		// 		},
		// 		portfolio: {
		// 			label:
		// 				lease.unit.property.portfolio.shortName ||
		// 				lease.unit.property.portfolio.fullName,
		// 			value: lease.unit.property.portfolio.id,
		// 		},
		// 		property: {
		// 			label: Property.getLabel(lease.unit.property),
		// 			value: lease.unit.property.id,
		// 		},
		// 		unit: {
		// 			label: Unit.getLabel(lease.unit),
		// 			value: lease.unitId,
		// 		},
		// 	};
		// } else if (options.tenantId) {
		// 	const tenant = await stuff.api!.tenants.findOne({ id: options.tenantId });
		// 	predefined = {
		// 		initiator: 'tenant',
		// 		tenantId: tenant.id,
		// 		fullName: tenant.fullName,
		// 		tenant: {
		// 			label: tenant.shortName || tenant.fullName,
		// 			value: tenant.id,
		// 		},
		// 		portfolio: undefined,
		// 		property: undefined,
		// 		unit: undefined,
		// 	};
		// } else if (options.unitId) {
		// 	const unit = await stuff.api!.units.findOne({ id: options.unitId });
		// 	unit.hateoas.
		// 	predefined = {
		// 		initiator: 'unit',
		// 		unitId: unit.id,
		// 		unitType: unit.type,
		// 		unitNumber: unit.unitNumber,
		// 		propertyId: unit.propertyId,
		// 		address: Property.getLabel(unit.property),
		// 		tenant: undefined,
		// 		portfolio: {
		// 			label:
		// 				unit.property.portfolio.shortName ||
		// 				unit.property.portfolio.fullName,
		// 			value: unit.property.portfolio.id,
		// 		},
		// 		property: {
		// 			label: Property.getLabel(unit.property),
		// 			value: unit.property.id,
		// 		},
		// 		unit: {
		// 			label: Unit.getLabel(unit),
		// 			value: unit.id,
		// 		},
		// 	};
		// }
		return {
			props: { predefined },
		};
	};
</script>

<script lang="ts">
	export let predefined: Predefined;
</script>

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
