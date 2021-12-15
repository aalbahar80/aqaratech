<script lang="ts">
	import { Order_By } from '../../generated/graphql';
	import ColumnToggle from '$components/table/ColumnToggle.svelte';
	import SortIndicator from '$components/table/SortIndicator.svelte';
	import BodySegmentGeneric from '$components/table/BodySegmentGeneric.svelte';
	import type { Field, FieldList } from '$components/form/Field';
	import { getContext } from 'svelte';
	import { key } from '$components/keyyy';
	import ModalEdit from '$components/modal/ModalEdit.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import type { Writable } from 'svelte/store';
	import { page } from '$app/stores';

	const { getGraphQlName, getFieldList, getIsFetching } = getContext(key);
	const _fieldList: SvelteStore<FieldList> = getFieldList();

	const isFetching: Writable<boolean> = getIsFetching();

	const segmentSize = 40;
	let sortingInfo: any = { id: Order_By.Asc };
	let segmentVarsList = [
		{
			limit: segmentSize,
			offset: 0,
			order_by: sortingInfo
		}
	];

	function handleSort(_fieldLabel: string) {
		//return early if fieldLabel is actions
		if (_fieldLabel === 'actions') {
			return;
		}
		if (sortingInfo[_fieldLabel]) {
			// already sorting by this field
			// just invert the direction
			const direction =
				sortingInfo[_fieldLabel] == Order_By.Desc
					? Order_By.Asc
					: Order_By.Desc;
			sortingInfo = {
				[_fieldLabel]: direction
			};
		} else {
			sortingInfo = { [_fieldLabel]: Order_By.Asc };
		}

		// reassign segmentVarsList completely to trigger rerender
		segmentVarsList = [
			{
				limit: segmentSize,
				offset: 0,
				order_by: sortingInfo
			}
		];
	}

	function loadMore(newOffset: number) {
		const newVars = {
			limit: segmentSize,
			offset: newOffset,
			order_by: sortingInfo
		};
		segmentVarsList = [...segmentVarsList, newVars];
	}
</script>

<div class="flex justify-between py-2">
	<ModalEdit />
	<a href={`${$page.path}/add`}>Add</a>
	<ColumnToggle />
</div>

<div class="overflow-x-auto flex-grow">
	<table class="table w-full table-compact table-zebra border-separate">
		<thead>
			<tr>
				{#each $_fieldList.fieldList as { fieldName, title, visibile, sortable }}
					{#if visibile}
						<th
							id={fieldName}
							class="sticky top-0 z-20"
							on:click={() => {
								handleSort(fieldName);
							}}
						>
							<div class="items-center align-middle inline-flex space-x-4">
								{title}
								{#if sortable}
									<SortIndicator sortMode={sortingInfo[fieldName]} />
								{/if}
							</div>
						</th>
					{/if}
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each segmentVarsList as segmentVars, i (segmentVars)}
				<BodySegmentGeneric {segmentVars} let:fetching>
					<!-- Only show the button on the last segment -->
					{#if i === segmentVarsList.length - 1 && !fetching}
						<button
							class="btn btn-block"
							on:click={() => loadMore(segmentVars.offset + segmentSize)}
						>
							load more
						</button>
					{/if}
				</BodySegmentGeneric>
			{/each}
		</tbody>
	</table>
	{#if $isFetching}
		<div class="flex flex-grow justify-center mt-10">
			<Fa icon={faSpinner} size="3x" spin />
		</div>
	{/if}
</div>

<style>
	#actions {
		z-index: 30;
	}
</style>
