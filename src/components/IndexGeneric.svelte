<script lang="ts">
	import { page } from '$app/stores';
	import TableGeneric from '$components/table/TableGeneric.svelte';

	export let title;
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<TableGeneric />
