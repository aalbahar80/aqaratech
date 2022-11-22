<script lang="ts">
	import type { TenantDto } from '$api/openapi';
	import { page } from '$app/stores';
	import Button from '$lib/components/buttons/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import { getRoute, PageType } from '@self/utils';
	import HeroiconsOutlineCollection from '~icons/heroicons-outline/collection';

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
>
	<svelte:fragment slot="actions">
		<Button
			icon={HeroiconsOutlineCollection}
			text="Tenant Dashboard"
			as="a"
			href={`/portal/tenant/${tenant.id}`}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>
