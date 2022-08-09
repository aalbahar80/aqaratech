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

		const relation = Object.entries(predefined).find(([key, value]) => value);
		const relationKey = relation?.[0];
		const relationValue = relation?.[1];

		if (!relationKey || !relationValue || typeof relationValue !== 'string') {
			throw new Error('Insufficient URL parameters');
		}

		return { props: { relationKey, relationValue } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let relationKey: Prop['relationKey'];
	export let relationValue: Prop['relationValue'];
</script>

<FileForm {relationKey} {relationValue} />
