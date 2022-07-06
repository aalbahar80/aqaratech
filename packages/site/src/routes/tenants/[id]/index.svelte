<script lang="ts" context="module">
	import TenantPage from '$lib/components/tenant/TenantPage.svelte';
	import { parseParams } from '$lib/utils/parse-params';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({
		params,
		stuff,
		url,
	}: LoadEvent<{ id: string }>) => {
		const sParams = parseParams(url);

		const [tenant, leases, invoices] = await Promise.all([
			stuff.api!.tenants.findOne({ id: params.id }),
			stuff.api!.tenants.findLeases({ id: params.id, ...sParams }),
			stuff.api!.tenants.findInvoices({ id: params.id, ...sParams }),
		]);

		return { props: { tenant, leases, invoices } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let tenant: Prop['tenant'];
	export let leases: Prop['leases'];
	export let invoices: Prop['invoices'];
</script>

<pre>{JSON.stringify(tenant, null, 2)}</pre>
<!-- <TenantPage {tenant} {leases} {invoices} /> -->
