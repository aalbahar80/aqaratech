<script lang="ts">
	import type { PageData } from './$types';

	import Tree from '$lib/tree/Tree.svelte';
	import { toHeirarchy } from '$lib/utils/expense-type-options';

	export let data: PageData;

	const root = toHeirarchy(data.categories);
</script>

<Tree {root} />
