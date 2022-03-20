<script context="module" lang="ts">
	import Chart from '$lib/components/Chart.svelte';
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
	<title>Dashboard</title>
</svelte:head>

<!-- <div class="grid grid-cols-2 items-center justify-between gap-y-4"> -->
<!-- <div
	class="grid auto-rows-fr grid-cols-1 items-center justify-between gap-4 lg:auto-cols-fr lg:grid-cols-2"
> -->
<div class="grid auto-rows-fr grid-cols-1 gap-4 bg-white lg:grid-cols-2">
	<Chart
		src="https://metabase.letand.be/public/question/0bd400fa-803b-4697-aa84-ae1b4d9b6228"
	/>
	<Chart
		src="https://metabase.letand.be/public/question/36b7faf8-8943-4204-a1f9-1c70f869ffd8"
	/>
	<Chart
		src="http://metabase.letand.be/public/question/16a8fe1b-7ef5-4fda-ac80-431845f6795b"
	/>
</div>
