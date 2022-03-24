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
	let oh: number;
	let oh2: number;
	let ch: number;
	let ch2: number;
	let ih: number;
	let ohh: number;
	let y: number;
</script>

<svelte:window bind:scrollY={y} bind:outerHeight={ohh} bind:innerHeight={ih} />

<!-- <div class="h-screen" bind:clientHeight={ch} bind:offsetHeight={oh}> -->
<div class="h-[95vh] bg-white" bind:clientHeight={ch} bind:offsetHeight={oh}>
	<iframe
		bind:clientHeight={ch2}
		bind:offsetHeight={oh2}
		title="dashboard2"
		src={iframeUrl}
		frameborder="0"
		allowtransparency
		class="flex min-h-full w-full flex-col"
	/>
</div>
<!-- class="h-[300rem] w-full p-4" -->
