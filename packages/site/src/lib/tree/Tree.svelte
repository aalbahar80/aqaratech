<script lang="ts">
	import Folder from './Folder.svelte';

	import type { ExpenseNode } from '$lib/utils/expense-type-options';

	export let root: ExpenseNode;
</script>

<Folder
	node={root}
	expanded
/>
