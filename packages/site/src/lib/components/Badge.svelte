<script lang="ts">
	export let label: string;
	export let badgeColor: string;
</script>

<div
	data-testid="badge"
	class="rounded-md px-2.5 py-0.5 text-center font-medium"
	class:green={badgeColor === 'green'}
	class:red={badgeColor === 'red'}
	class:indigo={badgeColor === 'indigo'}
	class:yellow={badgeColor === 'yellow'}
>
	<slot />
	{label}
</div>

<style lang="postcss">
	.green {
		@apply bg-green-100 text-green-800;
	}
	.red {
		@apply bg-pink-100 text-pink-800;
	}
	.indigo {
		@apply bg-indigo-100 text-indigo-800;
	}
	.yellow {
		@apply bg-yellow-100 text-yellow-800;
	}
</style>
