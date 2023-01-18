<script lang="ts">
	import type { Icon } from '$lib/models/types/icon.type';

	import { classes } from '$lib/utils/classes';

	export let icon: Icon;
	export let disabled = false;
</script>

<svelte:component
	this={icon}
	class={classes(
		'h-5 w-5 text-gray-400 ltr:mr-3 rtl:ml-3',
		disabled ? '' : 'group-hover:text-gray-500',
	)}
	aria-hidden="true"
/>
