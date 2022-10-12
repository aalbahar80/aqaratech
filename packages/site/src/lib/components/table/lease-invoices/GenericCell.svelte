<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import clsx from 'clsx';

	export let value: unknown;
	export let classes: string;
	export let tooltip: string;
</script>

<span class={clsx('inline-flex items-center gap-x-2', classes)}>
	{value}
	{#if tooltip}
		<Tooltip text={tooltip} />
	{/if}
</span>
