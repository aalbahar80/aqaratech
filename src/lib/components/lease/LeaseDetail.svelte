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

<button
	type="button"
	class="inline-flex items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
	on:click={openModal}
>
	Delete
</button>
