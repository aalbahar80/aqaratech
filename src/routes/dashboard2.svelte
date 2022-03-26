<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

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

	let iframe: HTMLIFrameElement | undefined;
	let value = 300;
</script>

<input type="number" bind:value />
<button
	on:click={() => {
		console.log(iframe.scrollHeight);
		console.log(iframe.height);
		console.log(iframe?.contentWindow.height);
		console.log(value);
	}}
	class="w-10">iframe height</button
>
<iframe
	bind:this={iframe}
	style:height={`${value}px`}
	title="myIframe"
	src={iframeUrl}
	allowtransparency
	class="w-px min-w-full"
	on:load={() => {
		console.log({ iframe }, 'dashboard2.svelte ~ 35');
		console.log(iframe.scrollHeight);
	}}
/>
