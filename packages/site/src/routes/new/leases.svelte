<script context="module" lang="ts">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import type { Predefined } from '$models/interfaces/lease.interface';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ url, stuff }) => {
		let options = Object.fromEntries(url.searchParams.entries());
		let predefined: Predefined | undefined;

		if (options.leaseId) {
			// renewing
			const lease = await stuff.api!.leases.findOne({ id: options.leaseId });
			predefined = {
				initiator: 'lease',
				tenantId: lease.tenantId,
				unitId: lease.unitId,
				propertyId: lease.breadcrumbs.property.id,
				monthlyRent: lease.monthlyRent,
				tenant: {
					label: lease.breadcrumbs.tenant.label,
					value: lease.breadcrumbs.tenant.id,
				},
				portfolio: {
					label: lease.breadcrumbs.portfolio.label,
					value: lease.breadcrumbs.portfolio.id,
				},
				property: {
					label: lease.breadcrumbs.property.label,
					value: lease.breadcrumbs.property.id,
				},
				unit: {
					label: lease.breadcrumbs.unit.label,
					value: lease.breadcrumbs.unit.id,
				},
			};
		} else if (options.tenantId) {
			const tenant = await stuff.api!.tenants.findOne({ id: options.tenantId });
			predefined = {
				initiator: 'tenant',
				tenantId: tenant.id,
				tenant: {
					label: tenant.shortName || tenant.fullName,
					value: tenant.id,
				},
				portfolio: undefined,
				property: undefined,
				unit: undefined,
			};
		} else if (options.unitId) {
			const unit = await stuff.api!.units.findOne({ id: options.unitId });
			predefined = {
				initiator: 'unit',
				unitId: unit.id,
				propertyId: unit.propertyId,
				tenant: undefined,
				portfolio: {
					label: unit.breadcrumbs!.portfolio.label,
					value: unit.breadcrumbs!.portfolio.id,
				},
				property: {
					label: unit.breadcrumbs!.property.label,
					value: unit.breadcrumbs!.property.id,
				},
				unit: {
					label: unit.breadcrumbs!.unit.label,
					value: unit.breadcrumbs!.unit.id,
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
