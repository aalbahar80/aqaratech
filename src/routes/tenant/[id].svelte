<script context="module" lang="ts">
	import TableTw from '$components/table/TableTW.svelte';
	import type { Load } from '@sveltejs/kit';
	import { omit } from 'lodash-es';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/transaction.json');
		const data = await res.json();

		return {
			props: {
				trx: data.rows,
			},
		};
	};
</script>

<script lang="ts">
	export let trx: any[];
	$: trx2 = trx.map((trxObject) =>
		omit(trxObject, ['id', 'createdAt', 'updatedAt']),
	);
</script>

<pre>{JSON.stringify(trx2)}</pre>
<div class="mx-auto max-w-lg">
	<TableTw rows={trx2} />
</div>
<!-- <div class="min-h-screen bg-gray-100">
	<div class="py-6">
		<div
			class="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8"
		>
			<div class="hidden lg:col-span-3 lg:block xl:col-span-2">
				<nav aria-label="Sidebar" class="sticky top-6 divide-y divide-gray-300">
					<Descripiton />
				</nav>
			</div>
			<main class="lg:col-span-9 xl:col-span-6">
				<TrxColumn />
				<Descripiton />
			</main>
			<aside class="hidden xl:col-span-4 xl:block">
				<div class="sticky top-6 space-y-4">
					<LeaseCard />
				</div>
			</aside>
		</div>
	</div>
</div> -->
