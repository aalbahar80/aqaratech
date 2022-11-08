<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageType, type Entity } from '@self/utils';
	import HeroiconsPlus from '~icons/heroicons/plus';

	export let entity: Entity;
	export let formUrl: string | undefined = undefined;
	export let buttonText = 'New';
</script>

<!-- TODO add back prefetch -->
<a
	href={formUrl ??
		getRoute({
			entity,
			pageType: PageType.New,
			params: $page.params,
		})}
	class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
>
	<HeroiconsPlus class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
	{buttonText}
</a>
