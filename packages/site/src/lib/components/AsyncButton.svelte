<script lang="ts">
	export let func: () => Promise<void>;
	export let disabled = false;
	let loading = false;
</script>

<button
	{disabled}
	on:click={async () => {
		loading = true;
		await func();
		loading = false;
	}}
>
	<slot {loading} />
</button>
