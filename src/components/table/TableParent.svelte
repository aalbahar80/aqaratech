<script context="module" lang="ts">
	import SlideOver from '$components/form/SlideOver.svelte';
	import { endpointBase, endpointPatch } from '$lib/config/constants';
	import startCase from 'lodash-es/startCase.js';
	import join from 'lodash-es/join.js';
	import TableTW from './TableTW.svelte';
</script>

<script lang="ts">
	export let rows: { id: string; [key: string]: unknown }[];
	export let defaultFormData: { [key: string]: unknown };
	export let endpointName: string;

	let formData: { [key: string]: unknown };
	let isOpen = false;
	let action: string;
	let formType: FormType = 'update';

	function initSlide(
		node: HTMLElement,
		{
			newFormData,
			formAction,
			type,
		}: { newFormData: any; formAction: string; type: FormType },
	) {
		function handleClick() {
			isOpen = true;
			formData = newFormData;
			action = formAction;
			formType = type;
		}
		node.addEventListener('click', handleClick);
		return {
			destroy() {
				node.removeEventListener('click', handleClick);
			},
		};
	}

	function patch(updated: { id: string; [key: string]: unknown }) {
		rows = rows.map((t) => {
			if (t.id === updated.id) return updated;
			return t;
		});
	}
</script>

<SlideOver bind:isOpen {formData} {action} {formType} {patch} />

<button
	use:initSlide={{
		newFormData: defaultFormData,
		formAction: endpointBase(endpointName),
		type: 'create',
	}}
	class="row__edit-button"
>
	New Inner
</button>

<TableTW {rows}>
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
			<tr class={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
				<slot name="rowsP">
					{#each Object.values(row) as value ({})}
						<td class="table__cell">{value}</td>
					{/each}
				</slot>
				<td class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
					<button
						class="text-indigo-600 hover:text-indigo-900"
						use:initSlide={{
							newFormData: row,
							formAction: endpointPatch(endpointName, row.id),
							type: 'update',
						}}
					>
						Edit
					</button>
				</td>
			</tr>
		{/each}
	</svelte:fragment>
</TableTW>

<style lang="postcss">
	.row__edit-button {
		@apply ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
	.table__header {
		@apply px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500;
	}
	.table__cell {
		@apply whitespace-nowrap px-6 py-4 text-sm text-gray-500;
	}
</style>
