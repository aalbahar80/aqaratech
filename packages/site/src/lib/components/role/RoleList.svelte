<script lang="ts">
	import { formatDistance } from 'date-fns';

	import { locale } from '$i18n/i18n-svelte';
	import RoleCard from '$lib/components/role/RoleCard.svelte';
	import StackedList from '$lib/components/StackedList.svelte';
	import { NEW_ORGANIZATION } from '$lib/constants/routes';

	import type { ValidatedRoleDto } from '$api/openapi';

	import Fa6SolidUserPlus from '~icons/fa6-solid/user-plus';

	export let roles: ValidatedRoleDto[];
</script>

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

<a
	class="text-center text-base font-semibold text-indigo-600 hover:text-indigo-700"
	href={NEW_ORGANIZATION($locale)}
	>Create new organization<span aria-hidden="true">→</span>
</a>
