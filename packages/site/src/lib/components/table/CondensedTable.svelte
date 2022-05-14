<script lang="ts">
	import CondensedActionCell from '$lib/components/table/CondensedActionCell.svelte';
	import CondensedCell from '$lib/components/table/CondensedCell.svelte';
	import { classes } from '$lib/utils';

	interface RowHeader {
		key: string;
		label: string;
		style?: 'regular' | 'bold1' | 'bold2';
		format?: (value: any) => string;
	}
	export let headers: RowHeader[];
	export let trxs: any[] = [];
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Transactions</h1>
			<p class="mt-2 text-sm text-gray-700">
				A table of placeholder stock market data that does not make any sense.
			</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
			>
				Export
			</button>
		</div>
	</div>
	<div class="mt-8 flex flex-col">
		<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div
					class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
				>
					<table class="min-w-full divide-y divide-gray-300">
						<thead class="bg-gray-50">
							<tr>
								{#each headers as header, idx (header)}
									{#if header.key === 'edit'}
										<th
											scope="col"
											class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
										>
											<span class="sr-only">Edit</span>
										</th>
									{:else}
										<th
											scope="col"
											class={classes(
												idx === 0 ? 'sm:pl-6 pl-4 pr-3' : 'px-2',
												'whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900',
											)}
										>
											{header.label}
										</th>
									{/if}
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each trxs as transaction (transaction.id)}
								<tr>
									{#each headers as header, idx (header)}
										{#if header.key === 'edit'}
											<CondensedActionCell href="#" label="Edit" />
										{:else}
											<CondensedCell
												{idx}
												value={header.format?.(transaction[header.key]) ??
													transaction[header.key]}
												weight={header.style}
											/>
										{/if}
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
