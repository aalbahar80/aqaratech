<script lang="ts">
	import { page } from '$app/stores';
	import { classes } from '$lib/utils/classes';
	import type { BreadcrumbsDto } from '$api/openapi';
	import { entitiesMap, isEntity } from '@self/utils';
	import * as R from 'remeda';

	export let crumbs: Partial<BreadcrumbsDto> | undefined;

	const tenantCrumbs = ['lease', 'invoice'];

	// api client fills undefined crumbs (expenses)
	$: truthyCrumbs = crumbs
		? R.pipe(
				R.toPairs(crumbs),
				R.filter((c) => {
					if ($page.data.user?.role?.roleType === 'TENANT') {
						return tenantCrumbs.includes(c[0]);
					}
					return !R.isNil(c[1]);
				}),
				(c) => {
					return c;
				},
		  )
		: [];
</script>

{#if crumbs}
	<nav class="flex" aria-label="Breadcrumb">
		<ol class="flex items-center space-x-4">
			{#each truthyCrumbs as [title, crumb], idx}
				{#if isEntity(title)}
					{@const href = `/${entitiesMap[title].urlName}/${crumb.id}`}
					{@const currentPage = $page.url.pathname === href}
					{#if crumb}
						<li>
							<div class="flex items-center">
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
								<a
									href={currentPage ? null : href}
									class={classes(
										'text-sm font-medium',
										currentPage
											? 'text-indigo-600 font-semibold'
											: 'text-gray-500 hover:text-gray-700',
									)}
									class:ml-4={idx !== 0}
									sveltekit:prefetch
								>
									{entitiesMap[title].singularCap}
								</a>
							</div>
						</li>
					{/if}
				{/if}
			{/each}
		</ol>
	</nav>
{/if}
