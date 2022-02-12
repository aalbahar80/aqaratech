<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { flash } from '$components/table/transition';
	import startCase from 'lodash-es/startCase.js';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import Pagination from './Pagination.svelte';
	import TableTW from './TableTW.svelte';

	let modifier: number = 1;

	beforeNavigate(({ from, to }) => {
		const oldPage = Number(from.searchParams.get('p'));
		const newPage = Number(to?.searchParams.get('p'));
		const result = setModifier(oldPage, newPage);
		modifier = result;
	});

	const setModifier = (from: number, to: number) => {
		if (from < to) {
			console.log('next');
			return 1;
		} else if (from > to) {
			console.log('prev');
			return -1;
		} else {
			console.log('same');
			return 1;
		}
	};

	export let rows: { id: string; [key: string]: unknown }[];
	// prefix with $:
	let dbColumns = Object.keys(rows[0]).map((key) => ({
		key,
		label: startCase(key),
		visible: key === 'createdAt',
	}));
	const editColumn = {
		key: 'edit',
		label: 'edit',
		visible: true,
	};

	let headers = [...dbColumns, editColumn];

	// create a new array with the edit column
	$: newRows = rows.map((row) => ({
		edit: `${row.id}/edit`,
		...row,
	}));

	$: console.log({ headers }, 'TableParent.svelte ~ 68');
</script>

{#each headers as header}
	<label>
		<input type="checkbox" bind:checked={header.visible} />
		{header.label}
	</label>
{/each}
<div
	class="mx-auto mt-8 flex max-w-screen-2xl flex-col gap-y-8 px-2 sm:px-6 lg:px-8"
>
	<a href={`${$page.url.pathname}/add`} class="table__add-button"> New </a>

	<TableTW>
		<svelte:fragment slot="headerRowC">
			{#each headers as header (header.key)}
				{#if header.visible}
					{#if header.key === 'edit'}
						<th scope="col" class="relative px-6 py-3">
							<span class="sr-only">Edit</span>
						</th>
					{:else}
						<th scope="col" class="table__header">
							{header.label}
						</th>
					{/if}
				{/if}
			{/each}
		</svelte:fragment>
		<svelte:fragment slot="rowsC">
			{#key rows[0].id}
				<tbody in:fly={{ duration: 700, y: 100 * modifier, easing: expoOut }}>
					{#each newRows as row, personIdx (row.id)}
						<tr
							animate:flip={{ duration: 200 }}
							class={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
						>
							{#each Object.entries(row) as [key, value] (key + value)}
								{#if headers.find((header) => header.key === key)?.visible}
									<td in:flash|local={{ duration: 1000 }} class="table__cell">
										{value}
									</td>
								{/if}
							{/each}
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
				</tbody>
			{/key}
		</svelte:fragment>
	</TableTW>
	<Pagination />
</div>

<style lang="postcss">
	.table__add-button {
		@apply ml-4 inline-flex w-1/6 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
	.table__header {
		@apply px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500;
	}
	.table__cell {
		@apply whitespace-nowrap px-6 py-4 text-sm text-gray-500;
	}
</style>
