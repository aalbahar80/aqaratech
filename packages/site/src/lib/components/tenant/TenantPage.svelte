<script lang="ts">
	import Button from '$lib/components/buttons/Button.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import type { TenantDto } from '$api/openapi';
	import { Collection } from '@steeze-ui/heroicons';

	export let tenant: TenantDto;
</script>

<Heading title="Tenant" id={tenant.id} entity="tenant">
	<svelte:fragment slot="actions">
		<Button
			icon={Collection}
			text="Tenant Dashboard"
			as="a"
			href={`/portal/tenant/${tenant.id}`}
			class="w-full sm:w-auto"
			prefetch
		/>
	</svelte:fragment>
</Heading>
