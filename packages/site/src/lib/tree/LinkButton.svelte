<script lang="ts">
	import { page } from '$app/stores';
	import { getRoute, PageType } from '@self/utils';

	import type { ExpenseNode } from '$lib/utils/expense-type-options';

	import HeroiconsArrowTopRightOnSquare from '~icons/heroicons/arrow-top-right-on-square';

	export let node: ExpenseNode;
</script>

<a
	title="View"
	href={getRoute({
		entity: 'expenseCategory',
		pageType: PageType.Id,
		params: $page.params,
		id: node.data.id,
	})}
	class="inline-flex items-center text-xs text-gray-500 rtl:-scale-x-100"
>
	<HeroiconsArrowTopRightOnSquare />
</a>
