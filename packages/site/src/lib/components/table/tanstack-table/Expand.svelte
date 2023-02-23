<script lang="ts">
	import clsx from 'clsx';

	import { width } from '$lib/stores/width';
	import HeroiconsArrowsPointingIn from '~icons/heroicons/arrows-pointing-in';
	import HeroiconsArrowsPointingOut from '~icons/heroicons/arrows-pointing-out';

	$: expanded = $width === '';
</script>

<button
	class={clsx(
		'absolute top-0 h-6 w-6 text-gray-500 ltr:right-0 rtl:left-0',
		// hide if !expanded && less than 1280px
		!expanded && 'max-[1550px]:hidden',
	)}
	on:click={() => {
		if (expanded) {
			$width = 'max-w-7xl';
		} else {
			$width = '';
		}
	}}
>
	{#if expanded}
		<HeroiconsArrowsPointingIn />
	{:else}
		<HeroiconsArrowsPointingOut />
	{/if}
</button>
