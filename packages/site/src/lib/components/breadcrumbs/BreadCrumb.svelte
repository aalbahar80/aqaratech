<script lang="ts">
	import { page, session } from '$app/stores';
	import { objectEntries } from '$lib/utils/common';
	import * as R from 'remeda';

	const routes = {
		client: { url: 'clients', label: 'Client' },
		property: { url: 'properties', label: 'Property' },
		unit: { url: 'units', label: 'Unit' },
		lease: { url: 'leases', label: 'Lease' },
		tenant: { url: 'tenants', label: 'Tenant' },
		mntnc: { url: 'maintenanceOrders', label: 'Maintenance Order' },
	};

	type Crumbs = Partial<Record<keyof typeof routes, string>>;
	export let crumbs: Crumbs;

	$: {
		// remove some crumbs if not admin
		if (!$session.authz?.isAdmin) {
			console.log({ crumbs }, 'before');
			crumbs = R.omit(crumbs, ['client', 'tenant']);
			console.log({ crumbs }, 'after');
		}
	}

	type Filtered = [keyof typeof routes, string][];
	$: filtered = Object.entries(crumbs).filter(([, value]) => value) as Filtered;
</script>

<nav class="flex" aria-label="Breadcrumb">
	<ol class="flex items-center space-x-4">
		{#each filtered as [entity, id], idx}
			{#if id}
				<li>
					<div class="flex items-center">
						{#if idx !== 0}
							<svg
								class="h-5 w-5 flex-shrink-0 text-gray-300"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
							</svg>
						{/if}
						<a
							href={`/${routes[entity].url}/${id}`}
							class="text-sm font-medium text-gray-500 hover:text-gray-700"
							class:ml-4={idx !== 0}
							sveltekit:prefetch
						>
							{`${routes[entity].label}`}
						</a>
					</div>
				</li>
			{/if}
		{/each}
	</ol>
</nav>
