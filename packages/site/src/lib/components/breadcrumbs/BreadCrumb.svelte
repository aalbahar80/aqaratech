<script lang="ts">
	import type { BreadcrumbsDto } from '@self/sdk';

	export let crumbs: Partial<BreadcrumbsDto> | undefined;
</script>

{#if crumbs}
	<nav class="flex" aria-label="Breadcrumb">
		<ol class="flex items-center space-x-4">
			{#each Object.values(crumbs) as crumb, idx}
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
							href={crumb.href}
							class="text-sm font-medium text-gray-500 hover:text-gray-700"
							class:ml-4={idx !== 0}
							sveltekit:prefetch
						>
							{crumb.rel}
						</a>
					</div>
				</li>
			{/each}
		</ol>
	</nav>
{/if}
