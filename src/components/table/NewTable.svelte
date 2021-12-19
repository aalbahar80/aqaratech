<script lang="ts">
	// import { key } from '$components/keyyy';
	import { getContext } from 'svelte';
	import { writable } from 'svelte/store';
	// export let svr;
	export let graphqlName;

	const { getsvr } = getContext(graphqlName);
	const svr = getsvr();

	const add = () => {
		$svr = [...$svr, 2];
		console.log($svr);
		console.log(graphqlName);
	};
</script>

{#each $svr as item}
	<p>{item}</p>
{/each}

<button class="btn btn-sm" on:click={add}>add tolist</button>
