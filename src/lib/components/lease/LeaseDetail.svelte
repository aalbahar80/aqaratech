<script lang="ts">
	import type { Entity } from '$lib/definitions';
	import IModalDelete from '../toast/IModalDelete.svelte';
	import Modal3 from '../toast/Modal3.svelte';
	import Modal4 from '../toast/Modal4.svelte';
	import { fade, fly } from 'svelte/transition';
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

<!-- {#if isOpen} -->
<!-- {#key isOpen} -->
<!-- Applying a svelte transition here interferes with the unmounting. Causes duplicates. Especially upon navigation by pressing delete. -->
<!-- <div transition:fly|local> -->
<!-- <div transition:fly> -->
<Modal4 />
<!-- <Modal3 /> -->
<!-- <Modal3 bind:isOpen /> -->
<!-- <p class="text-sm text-gray-500">
			Are you sure you want to deactivate your account? All of your data will be
			permanently removed. This action cannot be undone.
		</p> -->
<!-- {/key} -->
<!-- {/if} -->
<p>some text</p>
<p>some text below</p>
<!-- <div class="static">
	<IModalDelete bind:isOpen entity="leases" id={lease.id} />
</div> -->

<!-- <IModalDelete bind:isOpen entity="leases" id={lease.id} /> -->
<!-- <svelte:component this={ModalDelete} {isOpen} loading /> -->
<!-- <svelte:component this={IModalDelete} bind:isOpen {id} {entity} intro /> -->

<!-- <button
	on:click={() => {
		isOpen = true;
	}}>Open</button
>

<button
	on:click={() => {
		isOpen = false;
		console.log('isOpen', isOpen);
	}}>Hide it</button
> -->
