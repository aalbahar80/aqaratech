<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageType, type GetFormRoute } from '@self/utils';

	export let getRouteOptions: Omit<GetFormRoute, 'params' | 'pageType'>;
</script>

<a
	href={getRoute({
		pageType: PageType.New,
		params: $page.params,
		...getRouteOptions,
	})}
	class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
>
	+ New
</a>
