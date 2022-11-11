<script lang="ts">
	import type { LeaseInvoiceDto } from '$api/openapi';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/buttons/Button.svelte';
	import { addToast } from '$lib/stores/toast';
	import HeroiconsOutlineCash from '~icons/heroicons-outline/cash';

	export let invoice: LeaseInvoiceDto;

	let loading = false;
	const handlePayment = async () => {
		// TODO: move this to use:action
		// TODO: button spinner should also be use:action
		loading = true;
		try {
			const res = await fetch(`/api/payments/getUrl?id=${invoice.id}`);
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
	icon={HeroiconsOutlineCash}
	disabled={new Date(invoice.postAt) > new Date()}
	{loading}
	on:click={handlePayment}
/>
