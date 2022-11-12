<script lang="ts">
	import type { PaginatedRoleDto } from '$api/openapi';
	import { page } from '$app/stores';
	import IconButton from '$lib/components/buttons/IconButton.svelte';
	import MemberTable from '$lib/components/member/MemberTable.svelte';
	import { getRoute, PageType, type Entity } from '@self/utils';
	import HeroiconsPlus from '~icons/heroicons/plus';

	export let data: PaginatedRoleDto;
	export let predefined: {
		relationKey: Extract<Entity, 'organization' | 'portfolio' | 'tenant'>;
		relationValue: string;
	};
</script>

<div class="flex justify-end">
	<a
		class="relative left-0 float-right  w-24"
		href={getRoute({
			entity: 'role',
			pageType: PageType.New,
			params: $page.params,
			predefined,
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

<MemberTable {data} />
