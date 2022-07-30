<script lang="ts">
	import {
		fromHeirarchy,
		toHeirarchy,
		type ExpenseNode,
	} from '$lib/utils/expense-type-options';
	import * as d3 from 'd3';
	import {
		dndzone,
		SHADOW_PLACEHOLDER_ITEM_ID,
		SHADOW_ITEM_MARKER_PROPERTY_NAME,
		type DndEvent,
	} from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	export let root: ExpenseNode;
	export let node: ExpenseNode;

	const handleAction = (e: any) => {
		const detail: DndEvent<ExpenseNode> = e.detail;

		// filter existing children, then add the new one
		const newChildren: ExpenseNode[] = detail.items.filter(
			(fresh) => fresh.id !== SHADOW_PLACEHOLDER_ITEM_ID,
		);

		// give the new children a parent
		newChildren.forEach((child) => {
			child.data.parentId = node.data.id;
		});

		const newChildrenNames = newChildren.map((fresh) => fresh.data.labelEn);
		if (!newChildren.length) {
			console.log(`no new children for ${node.data.labelEn}`);
			return;
		} else {
			console.log(`${node.data.labelEn} has new child: ${newChildrenNames}`);
			return newChildren;
			// return fromHeirarchy(root, newChildren);
		}
	};

	const flipDurationMs = 300;
	function handleDndConsider(e: any) {
		const updatedNodes = handleAction(e);
		node.children = updatedNodes;
	}
	function handleDndFinalize(e: any) {
		const updatedNodes = handleAction(e);
		if (updatedNodes) {
			const updatedCategories = fromHeirarchy(root, updatedNodes);
			root = toHeirarchy(updatedCategories);
		}
	}
</script>

<!-- The text label. Doesn't affect dragging/dropping zones. -->
<b class="px-6 py-2"> {`${node.id} ${node.data.labelEn}`} </b>
{#if node.children}
	<!-- The section's y padding will determine how easy it is to make it swallow new children. -->
	<section
		class="py-8"
		use:dndzone={{
			items: node.children,
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
		<!-- WE FILTER THE SHADOW PLACEHOLDER THAT WAS ADDED IN VERSION 0.7.4, filtering this way rather than checking whether 'nodes' have the id became possible in version 0.9.1 -->
		{#each node.children.filter((n) => n.id !== SHADOW_ITEM_MARKER_PROPERTY_NAME) as currentNode (currentNode.id)}
			<div
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
