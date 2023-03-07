<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, isEntity, PageType } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import {
		handleCrumbs,
		type Crumbs,
	} from '$lib/components/breadcrumbs/crumbs-by-role';
	import { classes } from '$lib/utils/classes';

	export let crumbs: Crumbs;

	$: parsedCrumbs = handleCrumbs(crumbs, $page.data.user?.role?.roleType);
</script>

{#if crumbs}
	<nav
		class="flex overflow-auto"
		aria-label="Breadcrumb"
	>
		<ol class="flex items-center gap-x-4">
			{#each parsedCrumbs as [title, crumb], idx}
				{#if isEntity(title)}
					{@const href = getRoute({
						entity: title,
						id: crumb.id,
						pageType: PageType.Id,
						params: $page.params,
					})}
					{@const currentPage = $page.url.pathname === href}
					{#if crumb}
						<li>
							<div class="flex items-center gap-x-4">
								{#if idx !== 0}
									<svg
										class="h-5 w-5 flex-shrink-0 text-gray-300"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
									</svg>
								{/if}

								<!-- TODO add back prefetch -->
								<a
									href={currentPage ? null : href}
									class={classes(
										'text-sm font-medium',
										currentPage
											? 'font-semibold text-indigo-600'
											: 'text-gray-500 hover:text-gray-700',
									)}
								>
									{$L.entity[title].singular()}
								</a>
							</div>
						</li>
					{/if}
				{/if}
			{/each}
		</ol>
	</nav>
{/if}
