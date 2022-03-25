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
</script>

<svelte:head>
	<script src="https://metabase.letand.be/app/iframeResizer.js"></script>
</svelte:head>

<div class="h-[95vh] bg-white">
	<iframe
		title="dashboard2"
		src={iframeUrl}
		frameborder="0"
		allowtransparency
		class="flex min-h-full w-full flex-col"
		on:load={() => {
			iFrameResize({}, this);
		}}
	/>
</div>
