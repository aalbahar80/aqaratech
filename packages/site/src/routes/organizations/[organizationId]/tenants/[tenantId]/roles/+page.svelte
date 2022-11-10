<script lang="ts">
	import { page } from '$app/stores';
	import MemberList from '$lib/components/member/MemberList.svelte';
	import { getRoute, PageType } from '@self/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<MemberList
	roles={data.roles}
	formUrl={getRoute({
		entity: 'member',
		pageType: PageType.New,
		params: $page.params,
		predefined: {
			relationKey: 'tenant',
			relationValue: data.tenant.id,
		},
	})}
/>
