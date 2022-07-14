<script lang="ts" context="module">
	import TenantForm from '$lib/components/tenant/TenantForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const tenant = await stuff.api!.tenants.findOne({ id: params.id });

		return { props: { tenant } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let tenant: Prop['tenant'];
</script>

<TenantForm formType="update" data={tenant} />
