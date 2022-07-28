<script lang="ts">
	import { page } from '$app/stores';
	import { flash } from '$components/table/transition';
	import { columns } from '$lib/stores/columns';
	import { startCase } from '$lib/utils/common';
	import { flip } from 'svelte/animate';
	import { expoOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	export let rows: any[];
	export let modifier = 1;

	const alwaysHidden = ['id', 'label'];
	let hidden = alwaysHidden;

	// columns store should know whenever data changes
	$: columns.newData(rows);

	$: {
		if (innerWidth < 500) {
			hidden = [
				...alwaysHidden,
				'phone',
				'email',
				'completedAt',
				'createdAt',
				'updatedAt',
				'group',
			];
		} else if (innerWidth < 800) {
			hidden = [
				...alwaysHidden,
				'email',
				'completedAt',
				'createdAt',
				'updatedAt',
				'group',
			];
		} else {
			hidden = alwaysHidden;
		}
	}
	let innerWidth = 0;
	let outerWidth = 0;
</script>

<svelte:window bind:innerWidth bind:outerWidth />
<!-- <div class="flex space-x-4">
	{#each $columns as header}
		<label>
			<input
				id={header.key}
				type="checkbox"
				checked={header.visible}
				on:change={(e) => {
					columns.toggle(e.currentTarget.id, e.currentTarget.checked);
				}}
			/>
			{header.label}
		</label>
	{/each}
</div> -->

<div class="flex flex-col">
	<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
			<div
				class="overflow-hidden rounded-lg rounded-b-none border-b border-gray-200 shadow"
			>
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							{#each $columns as header (header.key)}
								{#if header.visible && !hidden.includes(header.key)}
									{#if header.key === 'edit' || header.key === 'view'}
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
						</tr>
					</thead>
					{#key rows[0].id}
						<tbody
							in:fly={{ duration: 700, y: 100 * modifier, easing: expoOut }}
						>
							{#each rows as row, personIdx (row.id)}
								<tr
									animate:flip={{ duration: 200 }}
									class={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
								>
									{#each Object.entries(row) as [key, value] (key + value)}
										{#if $columns.find((header) => header.key === key)?.visible && !hidden.includes(key)}
											{#if key === 'edit' || key === 'view'}
												<td
													class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
												>
													<a
														href={`${$page.url.pathname}/${value}`}
														class="text-indigo-600 hover:text-indigo-900"
													>
														{startCase(key)}
													</a>
												</td>
											{:else if value instanceof Date}
												<td
													in:flash|local={{ duration: 1000 }}
													class="table__cell"
												>
													{value.toISOString().slice(0, 10)}
												</td>
											{:else}
												<td
													in:flash|local={{ duration: 1000 }}
													class="table__cell"
												>
													{value || '-'}
												</td>
											{/if}
										{/if}
									{/each}
								</tr>
							{/each}
						</tbody>
					{/key}
				</table>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.table__header {
		@apply px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500;
	}
	.table__cell {
		@apply whitespace-nowrap px-6 py-4 text-sm text-gray-500;
	}
</style>
