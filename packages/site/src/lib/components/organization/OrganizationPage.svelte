<script lang="ts">
	import type { OrganizationDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import Heading from '$lib/components/Heading.svelte';

	export let organization: OrganizationDto;

	const onDelete = async () => {
		await goto(`/auth/logout`);
	};
</script>

<Heading
	title="Organization"
	id={organization.id}
	entity="organization"
	deletePrompt={organization.fullName}
	{onDelete}
/>
