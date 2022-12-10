<script lang="ts">
	import Heading from '$lib/components/Heading.svelte';
	import { getRoute, PageType } from '@self/utils';

	import type { TenantDto } from '$api/openapi';

	import { page } from '$app/stores';

	export let tenant: TenantDto;
</script>

<Heading
	title="Tenant"
	id={tenant.id}
	entity="tenant"
	onDelete={async (api) => {
		await api.tenants.remove({ id: tenant.id });

		const url = getRoute({
			entity: 'tenant',
			pageType: PageType.List,
			params: $page.params,
		});

		return url;
	}}
/>
