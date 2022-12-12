<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageType } from '@self/utils';

	import Heading from '$lib/components/Heading.svelte';

	import type { TenantDto } from '$api/openapi';

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
