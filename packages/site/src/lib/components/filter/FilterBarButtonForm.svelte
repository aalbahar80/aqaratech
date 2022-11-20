<script lang="ts">
	import { page } from '$app/stores';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';
	import {
		getRoute,
		PageType,
		type GetFormRouteWithoutRelation,
		type GetFormRouteWithRelation,
	} from '@self/utils';

	type NoParams<T> = Omit<T, 'params' | 'pageType'>;

	export let getRouteOptions:
		| NoParams<GetFormRouteWithRelation>
		| NoParams<GetFormRouteWithoutRelation>;
</script>

<RoleGuard roles={['ORGADMIN']}>
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
</RoleGuard>
