<script lang="ts">
	import SlideOver from '$components/form/SlideOver.svelte';
	import { endpointBase, endpointPatch } from '$lib/config/constants';
	import startCase from 'lodash-es/startCase.js';
	import { flip } from 'svelte/animate';
	import { scale, type TransitionConfig } from 'svelte/transition';
	import Pagination from './Pagination.svelte';
	import TableTW from './TableTW.svelte';

	const flash = (
		node: HTMLElement,
		{ duration }: { duration: number },
	): TransitionConfig => {
		node.classList.add(
			'bg-green-200',
			'animate-pulse',
			'bg-clip-border',
			'rounded-lg',
		);

		return {
			duration,
			tick: (t: number) => {
				if (t === 1) {
					node.classList.remove(
						'bg-green-200',
						'animate-pulse',
						'bg-clip-border',
						'rounded-lg',
					);
				}
			},
		};
	};

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
			update(freshData: any) {
				newFormData = freshData.newFormData;
			},
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

	function create(created: any) {
		rows = [created, ...rows];
	}
</script>

<SlideOver bind:isOpen {formData} {action} {formType} {patch} {create} />

<div
	class="mx-auto mt-8 flex max-w-screen-2xl flex-col gap-y-8 px-2 sm:px-6 lg:px-8"
>
	<button
		use:initSlide={{
			newFormData: defaultFormData,
			formAction: endpointBase(endpointName),
			type: 'create',
		}}
		class="row__edit-button"
	>
		New
	</button>

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
