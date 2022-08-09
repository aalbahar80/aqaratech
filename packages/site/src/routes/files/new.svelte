<script lang="ts" context="module">
	import FileForm from '$lib/components/file/FileForm.svelte';
	import type { PredefinedFile } from '$lib/models/interfaces/predefined.interface';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ url }: LoadEvent) => {
		const predefined: PredefinedFile = {
			tenantId: url.searchParams.get('tenantId'),
			portfolioId: url.searchParams.get('portfolioId'),
			propertyId: url.searchParams.get('propertyId'),
			unitId: url.searchParams.get('unitId'),
			expenseId: url.searchParams.get('expenseId'),
			leaseId: url.searchParams.get('leaseId'),
			leaseInvoiceId: url.searchParams.get('leaseInvoiceId'),
			maintenanceOrderId: url.searchParams.get('maintenanceOrderId'),
		};

		return { props: { predefined } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let predefined: Prop['predefined'];
</script>

<FileForm {predefined} />
