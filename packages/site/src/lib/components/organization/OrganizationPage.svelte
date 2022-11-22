<script lang="ts">
	import type { OrganizationDto } from '$api/openapi';
	import Heading from '$lib/components/Heading.svelte';

	export let organization: OrganizationDto;
</script>

<Heading
	title="Organization"
	id={organization.id}
	entity="organization"
	deletePrompt={organization.fullName}
	onDelete={async (api) => {
		await api.organizations.remove({ id: organization.id });

		return '/auth/logout';
	}}
/>
