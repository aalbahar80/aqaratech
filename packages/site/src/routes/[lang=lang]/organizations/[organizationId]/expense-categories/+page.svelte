<script lang="ts">
	import { categories } from '$lib/stores/expense-categories';
	import Tree from '$lib/tree/Tree.svelte';
	import { toHeirarchy } from '$lib/utils/expense-type-options';
</script>

<Tree root={toHeirarchy($categories)} />
