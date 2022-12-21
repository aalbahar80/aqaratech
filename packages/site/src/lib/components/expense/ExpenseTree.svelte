<script lang="ts">
	import {
		dndzone,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		SHADOW_PLACEHOLDER_ITEM_ID,
		type DndEvent,
	} from 'svelte-dnd-action';

	import { page } from '$app/stores';
	import { flip } from 'svelte/animate';

	import { getRoute, PageType } from '@self/utils';

	import { classes } from '$lib/utils/classes';
	import { ROOT_ID, type ExpenseNode } from '$lib/utils/expense-type-options';

	export let root: ExpenseNode;
	export let node: ExpenseNode;

	const handleAction = (e: any) => {
		const detail: DndEvent<ExpenseNode> = e.detail;

		// filter existing children, then add the new one
		const newChildren: ExpenseNode[] = detail.items.filter(
			(fresh) => fresh.id !== SHADOW_PLACEHOLDER_ITEM_ID,
		);

		// give the new children a parent here, this is necessary for dnd to know
		// how to handle the new children and update the tree. Dnd will then
		// animate, etc based on this change
		newChildren.forEach((child) => {
			child.data.parentId = node.data.id;
			child.parent = node;

			// remove the child from the old parent?
			// if (child.parent) {
			// 	child.parent.children = child.parent.children?.filter(
			// 		(child) => child.id !== child.data.id,
			// 	);
			// }
		});

		if (!newChildren.length) {
			return;
		} else {
			return newChildren;
		}
	};

	const flipDurationMs = 300;
	function handleDndConsider(e: any) {
		const updatedNodes = handleAction(e);
		node.children = updatedNodes;
	}

	function handleDndFinalize(e: any) {
		const updatedNodes = handleAction(e);
		node.children = updatedNodes;

		// Manually re-assign the root node to trigger a re-render.
		// Needed after #7981 was merged into svelte 3.54.0
		// Issue: https://github.com/sveltejs/svelte/pull/7981
		// eslint-disable-next-line no-self-assign
		root = root;
	}
</script>

<!-- The text label. Doesn't affect dragging/dropping zones. -->
{#if node.id !== ROOT_ID}
	<b
		id={node.data.id}
		class={classes(
			'flex items-center gap-6 px-6 py-2 font-medium',
			node.data.isGroup ? 'text-gray-700' : 'font-semibold text-gray-600',
		)}
	>
		{`${node.data.labelEn}`}

		<a
			class="text-xs font-medium text-indigo-600"
			href={getRoute({
				entity: 'expenseCategory',
				pageType: PageType.Edit,
				params: $page.params,
				id: node.data.id,
			})}
		>
			Edit
		</a>
	</b>
{/if}
{#if node.children || node.data.isGroup}
	<!-- The section's y padding will determine how easy it is to make it swallow new children. -->
	<section
		class="py-12"
		use:dndzone={{
			items: node.children || [],
			flipDurationMs,
			centreDraggedOnCursor: true,
			dropTargetStyle: {
				// border: 'rgba(255, 255, 200, 0.7) solid 20px',
				'background-color': '#ffffff',
				// adjust the last 6 digits of the fill to easily change color - pattern(set bg-color to white): https://heropatterns.com/ - colors: https://tailwindcss.com/docs/customizing-colors
				'background-image':
					"url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c7d2fe' fill-opacity='0.12' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")",
			},
		}}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		<!-- We fallback to en empty array because we still want empty `group nodes` (where node.data.isGroup = true) to be able to swallow new children.
         Otherwise, a dropzone will disappear as soon as all the children have been dragged out. -->
		{#each node.children?.filter((n) => n.id !== SHADOW_ITEM_MARKER_PROPERTY_NAME) || [] as currentNode (currentNode.id)}
			<div
				id={node.data.labelEn}
				animate:flip={{ duration: flipDurationMs }}
				class="my-6 mx-1 cursor-pointer rounded-lg border bg-white py-6 px-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
			>
				<!-- The div's y padding will determine how easy it is to insert nodes before/after it -->
				<svelte:self
					bind:root
					node={root.find((n) => n.id === currentNode.id)}
				/>
			</div>
		{/each}
	</section>
{/if}

<style>
	section {
		width: auto;
		/* this will allow the dragged element to scroll the list */
		overflow-y: auto;
		height: auto;
	}
	div {
		width: 90%;
	}
</style>
