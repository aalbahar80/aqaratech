<script lang="ts">
	import { page } from '$app/stores';
	import { getLabel } from '$lib/models/interfaces/property.interface';
	import { LocationMarker } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	interface Property {
		id: string;
		area: string | null;
		block: string | null;
		street: string | null;
		number: string | null;
	}
	export let idx: number;
	export let property: Property;
</script>

<a
	href={`${$page.stuff.hrefBase ?? ''}/properties/${property.id}`}
	class="block hover:bg-gray-50"
>
	<div class="px-4 py-4 sm:px-6">
		<div class="flex items-center justify-between">
			<p class="truncate text-sm font-medium text-indigo-600">
				# {idx + 1}
			</p>
		</div>
		<div class="mt-2 sm:flex sm:justify-between">
			<div class="sm:flex sm:space-x-4">
				<p class="flex items-center text-sm text-gray-500">
					<Icon
						src={LocationMarker}
						theme="solid"
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					{getLabel(property)}
				</p>
			</div>
		</div>
	</div>
</a>
