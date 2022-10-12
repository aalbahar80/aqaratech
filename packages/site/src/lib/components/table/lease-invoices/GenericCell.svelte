<script lang="ts">
	import Tooltip from '$lib/components/Tooltip.svelte';
	import clsx from 'clsx';

	export let value: unknown;
	export let classes: string | undefined = undefined;
	export let tooltip: string | undefined = undefined;
</script>

<span class={clsx('inline-flex items-center gap-x-2', classes)}>
	{value}
	{#if tooltip}
		<Tooltip text={tooltip} />
	{/if}
</span>
