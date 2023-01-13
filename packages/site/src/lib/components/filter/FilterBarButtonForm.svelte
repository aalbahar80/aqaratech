<script lang="ts">
	import { page } from '$app/stores';

	import {
		getRoute,
		PageType,
		type GetFormRouteBase,
		type GetFormRouteWithRelation,
	} from '@self/utils';

	import AddButton from '$lib/components/buttons/AddButton.svelte';
	import RoleGuard from '$lib/utils/RoleGuard.svelte';

	type NoParams<T> = Omit<T, 'params' | 'pageType'>;

	export let getRouteOptions:
		| NoParams<GetFormRouteWithRelation>
		| NoParams<GetFormRouteBase>;
</script>

<RoleGuard roles={['ORGADMIN']}>
	<AddButton
		href={getRoute({
			pageType: PageType.New,
			params: $page.params,
			...getRouteOptions,
		})}
	/>
</RoleGuard>
