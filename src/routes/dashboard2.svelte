<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { iframeResizer } from 'iframe-resizer';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/api/metabase');
		const { iframeUrl } = await res.json();
		return {
			props: { iframeUrl },
		};
	};
</script>

<script lang="ts">
	export let iframeUrl: string;

	let iframe: HTMLIFrameElement;
</script>

<iframe
	bind:this={iframe}
	title="myIframe"
	src={iframeUrl}
	frameborder="0"
	allowtransparency
	class="w-px min-w-full"
	on:load={() => {
		// try using e.target?
		iframeResizer({ log: true }, iframe);
	}}
/>
