<script lang="ts">
	let num = 3;
	let increment = 5;
</script>

<p class="mt-20" />

<input type="number" bind:value={increment} />
<button on:click={() => (num += increment)}>{num}</button>
