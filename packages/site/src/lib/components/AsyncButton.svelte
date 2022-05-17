<script lang="ts">
	export let func: () => Promise<any>;
	export let disabled = false;
	let loading = false;

	const handle = async () => {
		disabled = true;
		loading = true;
		try {
			await func();
		} catch (e) {
			console.error(e);
		} finally {
			disabled = false;
			loading = false;
		}
	};
</script>

<button {disabled} on:click={handle}>
	<slot {loading} {disabled} />
</button>
