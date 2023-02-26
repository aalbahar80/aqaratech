<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageType } from '@self/utils';

	import type { ExpenseNode } from '$lib/utils/expense-type-options';

	import HeroiconsPlus from '~icons/heroicons/plus';

	export let node: ExpenseNode;
</script>

<a
	title="Add child"
	href={getRoute({
		entity: 'expenseCategory',
		pageType: PageType.New,
		params: $page.params,
		predefined: {
			parentId: node.data.id,
		},
	})}
	class="inline-flex items-center text-xs text-gray-500"
>
	<HeroiconsPlus />
</a>
