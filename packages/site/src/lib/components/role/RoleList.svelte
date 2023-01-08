<script lang="ts">
	import { formatDistance } from 'date-fns';

	import { page } from '$app/stores';

	import { getRoute, PageType } from '@self/utils';

	import RoleCard from '$lib/components/role/RoleCard.svelte';
	import RoleEmptyState from '$lib/components/role/RoleEmptyState.svelte';
	import StackedList from '$lib/components/StackedList.svelte';

	import type { ValidatedRoleDto } from '$api/openapi';

	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: ValidatedRoleDto[];
</script>

{#if roles.length > 0}
	<StackedList title="Role">
		{#each roles as role (role.id)}
			{@const icons = [
				{
					label:
						'Added ' +
						formatDistance(new Date(role.createdAt), new Date(), {
							addSuffix: true,
						}),
					icon: Fa6SolidUserPlus,
					tooltip: 'createdAt',
				},
			]}
			<li>
				<RoleCard
					{role}
					{icons}
					on:delete={(e) => {
						roles = roles.filter((r) => r.id !== e.detail.id);
					}}
				/>
			</li>
		{/each}
	</StackedList>
{:else}
	<RoleEmptyState />
{/if}

<a
	class="text-center text-base font-semibold text-indigo-600 hover:text-indigo-700"
	href={getRoute({
		entity: 'organization',
		pageType: PageType.New,
		params: {
			lang: $page.params['lang'] ?? 'en', // HACK: svelte type limitation
		},
	})}>Create new organization<span aria-hidden="true">→</span></a
>
