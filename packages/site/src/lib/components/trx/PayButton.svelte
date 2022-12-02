<script lang="ts">
	import type { LeaseInvoiceDto } from '$api/openapi';
	import Button from '$lib/components/buttons/Button.svelte';
	import { addErrorToast } from '$lib/stores/toast';
	import HeroiconsOutlineCash from '~icons/heroicons-outline/cash';

	export let invoice: LeaseInvoiceDto;

	const handlePayment = () => {
		addErrorToast('Online payment not available yet');
	};
	// TODO: move this to use:action
	// TODO: button spinner should also be use:action
</script>

<Button
	--min-width="6rem"
	--min-height="4rem"
	text="Pay"
	icon={HeroiconsOutlineCash}
	disabled={true}
	loading={false}
	on:click={handlePayment}
/>
