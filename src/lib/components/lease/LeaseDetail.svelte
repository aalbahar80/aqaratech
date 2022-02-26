<script lang="ts">
	import type { Entity } from '$lib/definitions';
	import IModalDelete from '../toast/IModalDelete.svelte';
	import { onDestroy, onMount } from 'svelte';

	onDestroy(() => {
		console.log('lease detail destroyed');
	});
	onMount(() => {
		console.log(' mounted lease detail');
	});

	export let lease: any;
	export let entity: Entity = 'leases';
	export let id = '';

	let isOpen = false;
</script>

<pre>{JSON.stringify(lease, null, 2)}</pre>

{#if isOpen}
	<!-- <IModalDelete {isOpen} entity="leases" id={lease.id} /> -->
{/if}
<!-- <div class="static">
	<IModalDelete bind:isOpen entity="leases" id={lease.id} />
</div> -->

<IModalDelete bind:isOpen entity="leases" id={lease.id} />
<!-- <svelte:component this={ModalDelete} {isOpen} loading /> -->
<!-- <svelte:component this={IModalDelete} bind:isOpen {id} {entity} intro /> -->

<button
	on:click={() => {
		isOpen = true;
	}}>Delete</button
>
