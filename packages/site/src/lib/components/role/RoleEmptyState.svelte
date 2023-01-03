<script lang="ts">
	import { page } from '$app/stores';

	import { getRoute, PageType } from '@self/utils';

	import HeroiconsFolderPlus from '~icons/heroicons/folder-plus';
	import HeroiconsPlusSmall from '~icons/heroicons/plus-small';
</script>

<div class="text-center">
	<HeroiconsFolderPlus
		class="mx-auto h-12 w-12 text-gray-400"
		aria-hidden="true"
	/>

	<h3 class="mt-2 text-sm font-medium text-gray-900">No organizations</h3>
	<p class="mt-1 text-sm text-gray-500">
		This account is not a part of any existing organizations.
	</p>
	<div class="mt-6" />
	<a
		class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		href={getRoute({
			entity: 'organization',
			pageType: PageType.New,
			params: {
				lang: $page.params['lang'] ?? 'en', // HACK: svelte type limitation
			},
		})}
	>
		<HeroiconsPlusSmall class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />

		Create new organization
	</a>
</div>
