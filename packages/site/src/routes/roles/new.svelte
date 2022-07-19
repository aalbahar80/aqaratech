<script context="module" lang="ts">
	import RoleForm from '$lib/components/role/RoleForm.svelte';
	import type { PredefinedRole } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url }: LoadEvent) => {
		const sParams = {
			organizationId: url.searchParams.get('organizationId'),
			portfolioId: url.searchParams.get('portfolioId'),
			tenantId: url.searchParams.get('tenantId'),
		};
		let predefined: PredefinedRole;
		if (sParams.organizationId) {
			predefined = {
				entity: 'organizations',
				fieldName: 'organizationId',
				fieldValue: sParams.organizationId,
			};
		} else if (sParams.portfolioId) {
			predefined = {
				entity: 'portfolios',
				fieldName: 'portfolioId',
				fieldValue: sParams.portfolioId,
			};
		} else if (sParams.tenantId) {
			predefined = {
				entity: 'tenants',
				fieldName: 'tenantId',
				fieldValue: sParams.tenantId,
			};
		} else {
			throw new Error('No predefined role');
		}

		return { props: { predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let predefined: Prop['predefined'];
</script>

<RoleForm {predefined} />
