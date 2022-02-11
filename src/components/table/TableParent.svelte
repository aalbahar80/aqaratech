<script lang="ts">
	import { page } from '$app/stores';
	import { flash } from '$components/table/transition';
	import startCase from 'lodash-es/startCase.js';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import Pagination from './Pagination.svelte';
	import TableTW from './TableTW.svelte';

	export let rows: { id: string; [key: string]: unknown }[];
</script>

<div
	class="mx-auto mt-8 flex max-w-screen-2xl flex-col gap-y-8 px-2 sm:px-6 lg:px-8"
>
	<a href={`${$page.url.pathname}/add`} class="row__edit-button"> New </a>

	<TableTW>
		<svelte:fragment slot="headerRowC">
			<slot name="headerRowP">
				{#each Object.entries(rows[0]) as [headerCell] (headerCell)}
					<th scope="col" class="table__header">
						{startCase(headerCell)}
					</th>
				{/each}
			</slot>
		</svelte:fragment>
		<svelte:fragment slot="rowsC">
			{#each rows as row, personIdx (row.id)}
				<tr
					transition:scale|local={{ start: 0.7 }}
					animate:flip={{ duration: 200 }}
					class={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
				>
					<slot name="rowsP">
						{#each Object.entries(row) as [key, value] (key + value)}
							<td in:flash|local={{ duration: 1000 }} class="table__cell">
								{value}
							</td>
						{/each}
					</slot>
					<td
						class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
					>
						<a
							href={`${$page.url.pathname}/${row.id}/edit`}
							class="text-indigo-600 hover:text-indigo-900"
						>
							Edit
						</a>
					</td>
				</tr>
			{/each}
		</svelte:fragment>
	</TableTW>
	<Pagination />
</div>

<style lang="postcss">
	.row__edit-button {
		@apply ml-4 inline-flex w-1/6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
	.table__header {
		@apply px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500;
	}
	.table__cell {
		@apply whitespace-nowrap px-6 py-4 text-sm text-gray-500;
	}
</style>
