<script lang="ts">
	import { MenuItem } from '@rgossiaux/svelte-headlessui';

	import { page } from '$app/stores';

	import { entitiesMap, getRoute, PageType } from '@self/utils';

	import L from '$i18n/i18n-svelte';
	import Dropdown from '$lib/components/buttons/Dropdown.svelte';
	import DropdownMenu from '$lib/components/buttons/DropdownMenu.svelte';
	import HybridButton from '$lib/components/buttons/HybridButton.svelte';
	import MenuItemChild from '$lib/components/buttons/MenuItemChild.svelte';
	import MenuItemIcon from '$lib/components/buttons/MenuItemIcon.svelte';

	import Fa6SolidLayerGroup from '~icons/fa6-solid/layer-group';

	export let leaseId: string;
</script>

<Dropdown>
	<div slot="beforeButton">
		<a
			href={getRoute({
				entity: 'leaseInvoice',
				pageType: PageType.New,
				params: $page.params,
				predefined: {
					leaseId,
				},
			})}
			class="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
		>
			{`${$L.buttons.new()} ${$L.entity.leaseInvoice.singular()}`}
		</a>
	</div>
	<div slot="button">
		<!-- Rename to HybridButtonChevron  -->
		<HybridButton />
	</div>
	<div slot="menu">
		<DropdownMenu>
			<MenuItem as="div" let:active>
				<a
					href={`/${entitiesMap.leaseInvoice.urlName}/new-multiple?leaseId=${leaseId}`}
					data-sveltekit-reload
				>
					<MenuItemChild {active}>
						<MenuItemIcon icon={Fa6SolidLayerGroup} />
						{$L.entity.leaseInvoice.plural()}
					</MenuItemChild>
				</a>
			</MenuItem>
		</DropdownMenu>
	</div>
</Dropdown>
