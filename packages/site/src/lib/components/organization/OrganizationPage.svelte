<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import Heading from '$lib/components/Heading.svelte';
	import RoleList from '$lib/components/role/RoleList.svelte';
	import type { OrganizationDto, PaginatedRoleDto } from '@self/sdk';

	export let organization: OrganizationDto;
	export let roles: PaginatedRoleDto;

	$: details = [
		['Name', organization.fullName],
		['Phone', organization.label],
	] as [string, string | null][];
</script>

<Heading title="Organization" id={organization.id} entity="organizations" />
<DetailsPane {details} />
<RoleList {roles} />
