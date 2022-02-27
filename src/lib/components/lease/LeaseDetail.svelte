<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';

	type Lease = NonNullable<InferQueryOutput<'leases:read'>>;
	export let lease: Lease;
	export let isOpen: boolean;

	const openModal = () => {
		isOpen = true;
	};
</script>

<pre>{JSON.stringify(lease, null, 2)}</pre>
