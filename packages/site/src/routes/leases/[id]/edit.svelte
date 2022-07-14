<script lang="ts" context="module">
	import LeaseForm from '$lib/components/lease/LeaseForm.svelte';
	import type { LoadEvent } from '@sveltejs/kit';
	import type { LP } from 'src/types/load-props';

	export const load = async ({ params, stuff }: LoadEvent<{ id: string }>) => {
		const lease = await stuff.api!.leases.findOne({ id: params.id });

		return { props: { lease } };
	};
</script>

<script lang="ts">
	type Prop = LP<typeof load>;
	export let lease: Prop['lease'];
</script>

<LeaseForm formType="update" data={lease} />
