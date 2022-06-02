<script lang="ts">
	import { page } from '$app/stores';
	import { classes } from '$lib/utils/classes';
	import HeroiconsSolidChartPie from '~icons/heroicons-solid/chart-pie';
	import UisLayerGroup from '~icons/uis/layer-group';

	const subNavigation = [
		{
			name: 'Expense Categories',
			href: '/settings/expense-categories',
			current: true,
			icon: UisLayerGroup,
		},
		{
			name: 'Expense Groups',
			href: '/settings/expense-groups',
			current: false,
			icon: HeroiconsSolidChartPie,
		},
		// { name: 'Password', href: '#', current: false },
		// { name: 'Notifications', href: '#', current: false },
		// { name: 'Billing', href: '#', current: false },
		// { name: 'Integrations', href: '#', current: false },
	];
</script>

<div
	class="mx-auto mt-4 flex max-w-7xl flex-col space-y-6 rounded-md  p-4 sm:p-6 lg:p-8"
>
	<div class="flex gap-4">
		<aside class="py-6 lg:col-span-3">
			<nav class="space-y-1">
				{#each subNavigation as item (item.name)}
					<a
						href={item.href}
						class={classes(
							$page.url.pathname === item.href
								? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
								: 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
							'group border-l-4 px-3 py-2 flex items-center text-sm font-medium',
						)}
						aria-current={$page.url.pathname === item.href ? 'page' : undefined}
					>
						<svelte:component
							this={item.icon}
							class={classes(
								$page.url.pathname === item.href
									? 'text-teal-500 group-hover:text-teal-500'
									: 'text-gray-400 group-hover:text-gray-500',
								'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
							)}
							aria-hidden="true"
						/>
						<span class="truncate">{item.name}</span>
					</a>
				{/each}
			</nav>
		</aside>
		<div>
			<slot />
		</div>
	</div>
</div>
