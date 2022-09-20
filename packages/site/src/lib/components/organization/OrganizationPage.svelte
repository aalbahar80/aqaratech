<script lang="ts">
	import { goto } from '$app/navigation';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import type { OrganizationDto, PaginatedRoleDto } from '$api/openapi';

	export let organization: OrganizationDto;
	export let roles: PaginatedRoleDto;

	$: details = [
		['Name', organization.fullName],
		['Label', organization.label],
	] as [string, string | null][];

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
<DetailsPane {details} />
<MemberList {roles} />
