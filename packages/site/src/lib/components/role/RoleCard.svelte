<script lang="ts">
	import clsx from 'clsx';

	import { page } from '$app/stores';

	import RoleDetails from './RoleDetails.svelte';

	import type { ValidatedRoleDto } from '$api/openapi';
	import type { IconTooltip } from '$lib/models/types/icon-tooltip.type';

	import L, { locale } from '$i18n/i18n-svelte';
	import Badge from '$lib/components/Badge.svelte';
	import { PREF_LOCALE } from '$lib/constants/misc';
	import { getRoleMeta } from '$lib/utils/get-role-meta';
	import BxsBusiness from '~icons/bxs/business';
	import MdiAccount from '~icons/mdi/account';
	import MdiAccountTie from '~icons/mdi/account-tie';

	export let role: ValidatedRoleDto;
	export let icons: IconTooltip[];

	$: meta = getRoleMeta(role, $L, $locale);
	$: isActive = role.id === $page.data.user?.role?.id;
</script>

<a
	href={`/auth/roles/${role.id}?${PREF_LOCALE}=${$locale}`}
	data-sveltekit-reload
	rel="external"
	class={clsx(
		'flex h-52 flex-col gap-4 px-4 py-4 hover:bg-gray-50 sm:px-6',
		isActive && 'bg-indigo-100 hover:bg-indigo-200',
	)}
>
	<div class="inline-flex gap-2 self-end text-sm text-gray-600">
		{$L.other.accountType()}:
		{#if role.roleType === 'ORGADMIN'}
			<Badge
				label={meta.roleLabel}
				badgeColor="indigo"
			>
				<BxsBusiness class="mr-2 inline" />
			</Badge>
		{:else if role.roleType === 'PORTFOLIO'}
			<Badge
				label={meta.roleLabel}
				badgeColor="indigo"
			>
				<MdiAccountTie class="mr-2 inline" />
			</Badge>
		{:else if role.roleType === 'TENANT'}
			<Badge
				label={meta.roleLabel}
				badgeColor="indigo"
			>
				<MdiAccount class="mr-2 inline" />
			</Badge>
		{/if}
	</div>

	<RoleDetails {role} />
	<div class="mt-2 sm:flex sm:justify-between">
		<div class="sm:flex sm:space-x-4">
			{#each icons as { label, icon, tooltip } (tooltip)}
				{#if label}
					<p class="flex items-center text-sm text-gray-500">
						<svelte:component
							this={icon}
							class="me-1.5 h-4 w-4 flex-shrink-0 text-gray-400"
						/>
						{label}
					</p>
				{/if}
			{/each}
		</div>
	</div>
</a>
