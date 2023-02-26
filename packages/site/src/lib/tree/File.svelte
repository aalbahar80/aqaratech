<script lang="ts">
	import LinkButton from './LinkButton.svelte';

	import type { ExpenseNode } from '$lib/utils/expense-type-options';

	import HeroiconsDocument from '~icons/heroicons/document';

	export let node: ExpenseNode;
</script>

<div class="flex gap-2 pl-6 text-gray-700">
	<HeroiconsDocument class="text-gray-500" />

	{node.data.labelEn}

	<LinkButton {node} />
</div>
