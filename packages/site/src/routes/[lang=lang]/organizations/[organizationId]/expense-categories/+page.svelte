<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import { categories } from '$lib/stores/expense-categories';
	import Tree from '$lib/tree/Tree.svelte';
	import { toHeirarchy } from '$lib/utils/expense-type-options';
</script>

<!-- Title -->
<div class="flex items-center pb-4">
	<h2
		class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
	>
		{$L.entity.expenseCategory.plural()}
	</h2>
</div>

<Tree root={toHeirarchy($categories)} />
