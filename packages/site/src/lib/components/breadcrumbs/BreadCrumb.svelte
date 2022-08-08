<script lang="ts">
	import { page, session } from '$app/stores';
	import { classes } from '$lib/utils/classes';
	import type { BreadcrumbsDto } from '@self/sdk';
	import * as R from 'remeda';

	export let crumbs: Partial<BreadcrumbsDto> | undefined;

	const tenantCrumbs = ['lease', 'invoice'];

	// api client fills undefined crumbs (expenses)
	$: truthyCrumbs = crumbs
		? R.pipe(
				R.toPairs(crumbs),
				R.filter((c) => {
					if ($session.user?.role?.roleType === 'TENANT') {
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
			{#each truthyCrumbs as [_, crumb], idx}
				{@const currentPage = $page.url.pathname === crumb.href}
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
								href={currentPage ? null : crumb.href}
								class={classes(
									'text-sm font-medium',
									currentPage
										? 'text-indigo-600 font-semibold'
										: 'text-gray-500 hover:text-gray-700',
								)}
								class:ml-4={idx !== 0}
								sveltekit:prefetch
							>
								{crumb?.rel}
							</a>
						</div>
					</li>
				{/if}
			{/each}
		</ol>
	</nav>
{/if}
