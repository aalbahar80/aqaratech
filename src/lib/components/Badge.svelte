<script lang="ts">
	import { scale } from 'svelte/transition';

	export let label: string;
	export let badgeColor: string;
</script>

{#key label}
	<div
		class="rounded-md px-2.5 py-0.5 text-center text-lg font-medium"
		class:green={badgeColor === 'green'}
		class:red={badgeColor === 'red'}
		class:indigo={badgeColor === 'indigo'}
		in:scale
	>
		{label}
	</div>
{/key}

<style>
	.green {
		@apply bg-green-100 text-green-800;
	}
	.red {
		@apply bg-pink-100 text-pink-800;
	}
	.indigo {
		@apply bg-indigo-100 text-indigo-800;
	}
</style>
