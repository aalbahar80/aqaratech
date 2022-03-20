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
	console.log({ iframeUrl }, 'index.svelte ~ 16');
</script>

<svelte:head>
	<title>RE Co Admin</title>
</svelte:head>

<div
	class="mt-12 grid h-full w-full grid-cols-1 grid-rows-3 place-items-center gap-10"
>
	<h1 class="foot-bold text-7xl">Lorem Ipsum</h1>
	<p class="text-2xl">
		voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem.
		voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem.
	</p>

	<!-- width="800" height="600" -->
</div>

<!-- <div class="grid grid-cols-2 items-center justify-between gap-y-4"> -->
<!-- <div
	class="grid auto-rows-fr grid-cols-1 items-center justify-between gap-4 lg:auto-cols-fr lg:grid-cols-2"
> -->
<div class="grid auto-rows-fr grid-cols-1 gap-4">
	<!-- <iframe
		title="chart1"
		class="h-[36rem] w-full"
		src="https://metabase.letand.be/public/question/36b7faf8-8943-4204-a1f9-1c70f869ffd8"
		frameborder="0"
		allowtransparency
	/> -->
	<!-- <iframe
		title="chart1"
		class="h-full w-full"
		src={iframeUrl}
		frameborder="0"
		allowtransparency
	/> -->
	<!-- <div class="h-[36rem] bg-green-300" /> -->

	<!-- <div class="h-[36rem] bg-red-300" /> -->
</div>
<!-- <iframe
	src="https://metabase.letand.be/public/dashboard/4d6a4980-b35e-4ea9-9f83-1e06235b9d43"
	title="dashboard"
	frameborder="0"
	class="h-[36rem] w-full"
	allowtransparency
/> -->
