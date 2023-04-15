<script
	lang="ts"
	context="module"
>
	import { createPopover } from 'svelte-headlessui';

	import { fade } from 'svelte/transition';

	import L from '$i18n/i18n-svelte';
	import { landingLinks } from '$lib/components/navbar/landing-links';
	import HeroiconsBars3 from '~icons/heroicons/bars-3';
	import HeroiconsXMark20Solid from '~icons/heroicons/x-mark-20-solid';

	export const popover = createPopover({});
</script>

<button
	use:popover.button
	class="block p-2 md:hidden"
>
	<svelte:component
		this={$popover.expanded ? HeroiconsXMark20Solid : HeroiconsBars3}
		class="h-6 w-6 text-gray-500"
	/>
</button>

<!-- Overlay (dim background) -->
{#if $popover.expanded}
	<div
		class="fixed inset-0 bg-black/30"
		transition:fade={{ duration: 100 }}
	/>

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		use:popover.panel
		class="absolute inset-x-0 top-full mx-4 mt-4 flex origin-top flex-col gap-2 rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 md:hidden"
		on:click={popover.close}
		transition:fade={{ duration: 100 }}
	>
		{#each landingLinks($L) as item}
			<a
				use:popover.button
				href={item.href}
				class="block w-full rounded-lg p-2 hover:bg-slate-100"
			>
				{item.label}
			</a>
		{/each}
	</div>
{/if}
