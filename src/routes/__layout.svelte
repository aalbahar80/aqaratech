<script lang="ts">
	import { navigating } from '$app/stores';
	import NavBar from '$components/form/NavBar.svelte';
	import PreloadingIndicator from '$components/PreloadingIndicator.svelte';
	import ToastParent from '$components/toast/ToastParent.svelte';
	import '../styles/tailwind.css';
</script>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<NavBar />
<ToastParent />
<slot />
