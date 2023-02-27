<script lang="ts">
	import LinkButton from './LinkButton.svelte';

	import type { ExpenseNode } from '$lib/utils/expense-type-options';

	import HeroiconsDocument from '~icons/heroicons/document';

	export let node: ExpenseNode;
</script>

<div class="ps-6 flex gap-2 text-gray-700">
	<HeroiconsDocument class="text-gray-500" />

	{node.data.labelEn}

	<LinkButton {node} />
</div>
