<script lang="ts">
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import type { Entity } from '$lib/definitions';
	import { Trash } from '@steeze-ui/heroicons';

	export let title: string;
	export let id: string;
	export let entity: Entity;

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="flex items-center justify-between">
	<ModalDelete bind:isOpen {id} {entity} />
	<div class="min-w-0 flex-1">
		<div class="mt-2 flex items-center space-x-8">
			<h2
				class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
			>
				{title}
			</h2>
		</div>
	</div>
	<div class="mt-5 flex space-x-3 lg:mt-0 lg:ml-4">
		<ButtonDropdown
			defaultOption={{
				label: 'Edit',
				href: `/${entity}/${id}/edit`,
			}}
			options={[
				{
					label: 'Delete',
					icon: Trash,
					onClick: openModal,
				},
			]}
		/>
	</div>
</div>
