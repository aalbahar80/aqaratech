<script lang="ts">
	import { navigating } from '$app/stores';
	import NavBar from '$components/NavBar.svelte';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import '../styles/tailwind.css';
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<div class="h-full">
	<NavBar />
	<ToastParent />
	<div class="mx-auto flex max-w-6xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
		<slot />
	</div>
</div>
