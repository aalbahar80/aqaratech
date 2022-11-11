<script lang="ts">
	import type { TenantDto } from '$api/openapi';
	import Button from '$lib/components/buttons/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import HeroiconsOutlineCollection from '~icons/heroicons-outline/collection';

	export let tenant: TenantDto;
</script>

<Heading title="Tenant" id={tenant.id} entity="tenant">
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
