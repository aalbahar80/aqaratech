<script lang="ts">
	import { session } from '$app/stores';
	import type { Entity } from '$lib/models/interfaces/entity.interface';
	import { getModel } from '$lib/models/interfaces/utils/get-model';

	type Crumb = [Entity, string | undefined];
	export let crumbs: Crumb[];

	$: {
		// remove clients crumb if not admin
		if (!$session.authz?.isAdmin) {
			crumbs = crumbs.filter(([entity]) => entity !== 'clients');
		}
	}
</script>

<nav class="flex" aria-label="Breadcrumb">
	<ol class="flex items-center space-x-4">
		{#each crumbs as crumb, idx (crumb[0])}
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
						href={`/${crumb[0]}/${crumb[1]}`}
						class="text-sm font-medium text-gray-500 hover:text-gray-700"
						class:ml-4={idx !== 0}
					>
						<!-- aria-current={page.current ? 'page' : undefined} -->
						{getModel(crumb[0]).singularCap}
					</a>
				</div>
			</li>
		{/each}
	</ol>
</nav>
