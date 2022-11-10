<script lang="ts">
	import type { OrganizationDto, PaginatedRoleDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import { getRoute, PageType } from '@self/utils';

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
<MemberList
	{roles}
	formUrl={getRoute({
		entity: 'member',
		pageType: PageType.New,
		params: $page.params,
		predefined: {
			relationKey: 'organization',
			relationValue: organization.id,
		},
	})}
/>
