<script lang="ts">
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import { create } from '$lib/utils/route-helpers';
	import { DocumentDuplicate } from '@steeze-ui/heroicons';

	export let leaseId: string | undefined = undefined;
</script>

<Dropdown>
	<div slot="beforeButton">
		<a
			href={create({
				entity: 'leaseInvoices',
				predefined: new Map([['leaseId', leaseId]]),
			})}
			class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			Add invoice
		</a>
	</div>
	<div slot="button">
		<!-- Rename to HybridButtonChevron  -->
		<HybridButton />
	</div>
	<div slot="menu">
		<DropdownMenu
			options={[
				{
					label: 'Add multiple invoices',
					icon: DocumentDuplicate,
					href: '/lease-invoices/add-multiple',
				},
			]}
		/>
	</div>
</Dropdown>
