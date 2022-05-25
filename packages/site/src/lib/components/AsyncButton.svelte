<script lang="ts">
	import { addToast } from '$lib/stores/toast';

	export let func: () => Promise<void> | Promise<Response>;
	export let disabled = false;

	let loading = false;

	const handle = async () => {
		disabled = true;
		loading = true;
		try {
			const res = await func();
			// check if function is a promise that resolves to a response
			if (res instanceof Response) {
				const data = await res.json();
				// dispatch success event
				if (res.ok) {
					addToast({
						duration: 30000,
						props: {
							kind: 'success',
							title: 'Success',
						},
					});
				} else if ('errorMsg' in data) {
					addToast({
						duration: 30000,
						props: {
							kind: 'error',
							title: 'Error',
							subtitle: data.errorMsg,
						},
					});
				} else {
					throw new Error(res.statusText);
				}
			}
		} catch (e) {
			// dispatch error event
			console.error(e);
			addToast({
				duration: 30000,
				props: {
					kind: 'error',
					title: 'Error',
				},
			});
		} finally {
			disabled = false;
			loading = false;
		}
	};
</script>

<button {disabled} on:click={handle} class="contents">
	<slot {loading} {disabled} />
</button>
