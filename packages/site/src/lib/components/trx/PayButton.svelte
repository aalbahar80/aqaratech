<script lang="ts">
	import { goto } from '$app/navigation';
	import { addToast } from '$lib/stores/toast';
	import { Cash } from '@steeze-ui/heroicons';
	import Button from '../Button.svelte';

	interface Transaction {
		id: string;
		postAt: Date;
	}

	export let trx: Transaction;

	let loading = false;
	const handlePayment = async () => {
		// TODO: move this to use:action
		// TODO: button spinner should also be use:action
		loading = true;
		try {
			const res = await fetch(`/api/payments/getUrl?id=${trx.id}`);
			const data = await res.json();
			if (res.ok) {
				goto(data.paymentUrl).catch(console.error);
			} else {
				addToast({
					props: {
						kind: 'error',
						title: 'Error',
						subtitle: data.errorMsg,
					},
				});
			}
		} catch (err) {
			console.error({ err }, 'PayButton.svelte ~ 24');
			addToast({
				props: {
					kind: 'error',
					title: 'Error',
					subtitle: 'An error occured while grabbing payment url',
				},
			});
		} finally {
			loading = false;
		}
	};
</script>

<Button
	--min-width="6rem"
	--min-height="4rem"
	text="Pay"
	icon={Cash}
	disabled={trx.postAt > new Date()}
	{loading}
	on:click={handlePayment}
/>
