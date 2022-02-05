<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let myId: string;
	$: console.log($page.params.id);
	$: id = $page.params.id;
</script>

<a href={`/sample/${+id + 1}`} sveltekit:prefetch>go next</a>
<a href={`/sample/111`} sveltekit:prefetch>go next</a>
<a href={`/sample/222`} sveltekit:prefetch>go next</a>
<a href={`/sample/333`} sveltekit:prefetch>go next</a>
<p>{myId}</p>

<button
	on:click={() => {
		goto('/sample/' + (+id + 1));
	}}
>
	try but go next</button
>
