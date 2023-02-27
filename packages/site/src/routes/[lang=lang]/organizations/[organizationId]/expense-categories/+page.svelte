<script lang="ts">
	import type { PageData } from './$types';

	import { categories } from '$lib/stores/expense-categories';
	import Tree from '$lib/tree/Tree.svelte';
	import { toHeirarchy } from '$lib/utils/expense-type-options';

	export let data: PageData;
</script>

<Tree root={toHeirarchy($categories)} />
