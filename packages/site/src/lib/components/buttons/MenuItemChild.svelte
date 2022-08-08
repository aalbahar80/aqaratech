<script lang="ts">
	import { classes } from '$lib/utils/classes';

	export let active: boolean;
	export let disabled = false;
</script>

<div
	class={classes(
		active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
		disabled ? 'disabledLink' : '',
		'group flex items-center px-4 py-4 text-sm',
	)}
>
	<slot />
</div>

<style lang="postcss">
	.disabledLink {
		@apply cursor-not-allowed opacity-50;
	}
</style>
