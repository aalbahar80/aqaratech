<script lang="ts">
	import type { OrganizationDto, PaginatedRoleDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import AutoDetailsPane from '$lib/components/AutoDetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import MemberTab from '$lib/components/member/MemberTab.svelte';

	export let organization: OrganizationDto;
	export let roles: PaginatedRoleDto;

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

<AutoDetailsPane details={organization} keys={['fullName', 'label']} />

<MemberTab
	data={roles}
	predefined={{
		relationKey: 'organization',
		relationValue: organization.id,
	}}
/>
