<script lang="ts">
	import type { Entity } from '$lib/definitions';
	import IModalDelete from '../toast/IModalDelete.svelte';
	import Modal3 from '../toast/Modal3.svelte';
	import Modal4 from '../toast/Modal4.svelte';
	import { fade, fly } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	onDestroy(() => {
		console.warn('destroyed lease detail');
	});
	onMount(() => {
		console.log(' mounted lease detail');
	});

	export let lease: any;
	export let entity: Entity = 'leases';
	export let id = '';

	let isOpen = false;
	$: console.log(isOpen);
</script>

<pre>{JSON.stringify(lease, null, 2)}</pre>

<Modal4 bind:isOpen />
<!-- on:closedModal={() => {
		console.log('received close event');
		isOpen = false;
	}} -->

<!-- {#if isOpen} -->
<!-- <Modal4 /> -->
<!-- <Modal4 {isOpen} /> -->
<!-- <Modal4 bind:isOpen /> -->
<!-- <Modal4 on:close on:afterLeave /> -->
<!-- <Modal4
		on:closedModal={() => {
			console.log('received close event');
			isOpen = false;
		}}
	/> -->
<!-- {/if} -->
<p>some text</p>
<p>some text below</p>
<!-- <div class="static">
	<IModalDelete bind:isOpen entity="leases" id={lease.id} />
</div> -->

<!-- <IModalDelete bind:isOpen entity="leases" id={lease.id} /> -->
<!-- <svelte:component this={ModalDelete} {isOpen} loading /> -->
<!-- <svelte:component this={IModalDelete} bind:isOpen {id} {entity} intro /> -->

<button
	on:click={() => {
		isOpen = true;
	}}>Open</button
>

<button
	on:click={() => {
		isOpen = false;
		console.log('isOpen', isOpen);
	}}>Hide it</button
>
