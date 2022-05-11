<script lang="ts">
	export let func: () => Promise<void>;
	let loading = false;
</script>

<button
	on:click={async () => {
		loading = true;
		await func();
		loading = false;
	}}
>
	<slot {loading} />
</button>
