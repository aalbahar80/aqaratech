<script lang="ts" context="module">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../../../../styles/tailwind.css';
</script>

<Navbar hideClients />
<slot />
