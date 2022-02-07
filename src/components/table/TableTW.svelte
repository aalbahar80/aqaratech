<script lang="ts">
	import startCase from 'lodash-es/startCase.js';

	export let rows: { id: string; [key: string]: unknown }[];
</script>

<div class="flex flex-col">
	<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
			<div
				class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
			>
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							{#each Object.entries(rows[0]) as [field] (field)}
								<th scope="col" class="table__header"> {startCase(field)} </th>
							{/each}
							<th scope="col" class="relative px-6 py-3">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each rows as row, personIdx (row.id)}
							<tr class={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
								{#each Object.values(row) as value ({})}
									<td class="table__cell">{value}</td>
								{/each}
								<!-- <td
									class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
									>{row.firstName}</td
								> -->
								<td
									class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
								>
									<slot {row} />
								</td>
							</tr>
						{/each}
					</tbody>
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
