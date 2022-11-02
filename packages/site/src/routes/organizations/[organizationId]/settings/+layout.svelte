<script lang="ts">
	import { page } from '$app/stores';
	import { classes } from '$lib/utils/classes';
	import { settings } from '$lib/utils/route-helpers';
	import BxsBusiness from '~icons/bxs/business';
	import Fa6SolidNetworkWired from '~icons/fa6-solid/network-wired';

	$: subroutes = settings($page.params.organizationId!);
	$: subNavigation = [
		{
			name: 'Organization',
			href: subroutes.organization,
			icon: BxsBusiness,
		},
		{
			name: 'Expense Tree',
			href: subroutes.tree,
			icon: Fa6SolidNetworkWired,
		},
	];
</script>

<div class="flex flex-col gap-8 py-6 lg:flex-auto lg:flex-row">
	<aside class="lg:col-span-3">
		<nav class="space-y-1">
			{#each subNavigation as item (item.name)}
				<a
					href={item.href}
					class={classes(
						$page.url.pathname.endsWith(item.href)
							? 'border-indigo-500 bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
							: 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
						'group flex items-center border-l-4 px-3 py-2 text-sm font-medium',
					)}
					aria-current={$page.url.pathname === item.href ? 'page' : undefined}
				>
					<svelte:component
						this={item.icon}
						class={classes(
							$page.url.pathname.endsWith(item.href)
								? 'text-indigo-500 group-hover:text-indigo-500'
								: 'text-gray-400 group-hover:text-gray-500',
							'-ml-1 mr-3 h-6 w-6 flex-shrink-0',
						)}
						aria-hidden="true"
					/>
					<span class="truncate">{item.name}</span>
				</a>
			{/each}
		</nav>
	</aside>
	<div class="w-full">
		<div class="mx-auto max-w-7xl space-y-6 rounded-md p-4 sm:p-6 lg:px-8">
			<slot />
		</div>
	</div>
</div>
