<script lang="ts">
	import { page } from '$app/stores';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import MemberTable from '$lib/components/member/MemberTable.svelte';
	import { getRoute, PageType } from '@self/utils';
	import HeroiconsPlus from '~icons/heroicons/plus';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex justify-end">
	<a
		class="relative left-0 float-right  w-24"
		href={getRoute({
			entity: 'member',
			pageType: PageType.New,
			params: $page.params,
			predefined: {
				relationKey: 'tenant',
				relationValue: data.tenant.id,
			},
		})}
	>
		<IconButton>
			<div slot="icon">
				<HeroiconsPlus />
			</div>

			New
		</IconButton>
	</a>
</div>

<MemberTable data={data.roles} />
