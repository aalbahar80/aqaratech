<script lang="ts">
	import type { OrganizationDto } from '$api/openapi';

	import L from '$i18n/i18n-svelte';
	import Heading from '$lib/components/Heading.svelte';

	export let organization: OrganizationDto;
</script>

<Heading
	title={$L.entity.organization.singular()}
	id={organization.id}
	entity="organization"
	deletePrompt={organization.fullName}
	onDelete={async (api) => {
		await api.organizations.remove({ id: organization.id });

		return '/auth/logout';
	}}
/>
