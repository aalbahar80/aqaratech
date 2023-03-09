<script>
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-nocheck
	import clsx from 'clsx';

	import { browser } from '$app/environment';
	import { toBrowserLocale } from '@self/utils';
	import { FORMATS } from '@self/utils/src/entity/form/field/format';

	import './treemap.css';

	import { locale } from '$i18n/i18n-svelte';

	export let node;
	export let leaf;
	export let getLabel;
	export let getLink = undefined;
</script>

<svelte:head>
	{#if browser && !('container' in document.documentElement.style)}
		<!-- Polyfill for container queries -->
		<!-- https://github.com/GoogleChromeLabs/container-query-polyfill -->
		<script
			src="https://cdn.jsdelivr.net/npm/container-query-polyfill@1/dist/container-query-polyfill.modern.js"
		></script>
	{/if}
</svelte:head>

<!-- Tile -->
<div
	class={clsx(
		'tile flex h-full w-full items-center justify-center rounded-lg border-4 border-white px-1 py-1.5 text-gray-500',
		leaf
			? 'bg-gradient-to-br from-blue-600/50 via-blue-400/50 to-rose-50'
			: 'bg-gradient-to-br from-blue-100 to-rose-50',
	)}
>
	<!-- Label -->
	<div class="label transition-[font-size] duration-700 ease-out">
		<!-- Consider passing in link in data structure if there is a need to optimize -->
		{#if getLink?.(node)}
			<a
				class="absolute right-2 top-2 align-middle text-indigo-600"
				class:hidden={node.children}
				href={getLink(node)}
				target="_blank"
				rel="noopener noreferrer"
				data-sveltekit-reload
			>
				&#8599;
			</a>
		{/if}
		<strong class="md:pb-3">{getLabel(node) ?? ''}</strong>
		<span
			>{new Intl.NumberFormat(toBrowserLocale($locale), {
				...FORMATS.currency,
				style: undefined,
			}).format(node.value)}</span
		>
	</div>
</div>
