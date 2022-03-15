<script lang="ts">
	import { navigating } from '$app/stores';
	import NavBar from '$components/NavBar.svelte';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import '../styles/tailwind.css';
	import 'tippy.js/dist/tippy.css';
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<div class="h-full">
	<NavBar />
	<ToastParent />
	<slot />
</div>
