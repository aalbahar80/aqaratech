<script lang="ts">
	export let label: string;
	export let color: 'green' | 'red' | 'indigo' | 'gray' | string = 'indigo';
</script>

<span
	class="badge"
	class:green={color === 'green'}
	class:red={color === 'red'}
	class:indigo={color === 'indigo'}
	class:gray={color === 'gray'}
>
	{label}
</span>

<style lang="postcss">
	.badge {
		@apply inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize;
	}
	.green {
		@apply bg-green-100 text-green-800;
	}
	.red {
		@apply bg-red-100 text-red-800;
	}
	.indigo {
		@apply bg-indigo-100 text-indigo-800;
	}
	.gray {
		@apply bg-gray-100 text-gray-800;
	}
</style>
