<!-- <script lang="ts">
	import type { OrganizationDto } from '$api/openapi';
	import { AtSymbol, FolderOpen, Phone } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let organization: OrganizationDto;
</script> -->

<!-- <pre>{JSON.stringify(organization, null, 2)}</pre> -->
<!-- <a
	href={`/organizations/${organization.id}`}
	class="block hover:bg-gray-50"
>
	<div class="px-4 py-4 sm:px-6">
		<div class="flex items-center justify-between">
			<p class="truncate text-sm font-medium text-indigo-600">
				# {organization.label}
			</p>
		</div>
		<div class="mt-2 sm:flex sm:justify-between">
			<div class="sm:flex sm:space-x-4">
				<p class="flex items-center text-sm text-gray-500">
					<Icon
						src={FolderOpen}
						theme="solid"
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					{organization.fullName}
				</p>
			</div>
		</div>
		<div class="mt-2 sm:flex sm:justify-between">
			<div class="sm:flex sm:space-x-4">
				<p class="flex items-center text-sm text-gray-500">
					<Icon
						src={AtSymbol}
						theme="solid"
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					{organization.email || ''}
				</p>
			</div>
		</div>
		<div class="mt-2 sm:flex sm:justify-between">
			<div class="sm:flex sm:space-x-4">
				<p class="flex items-center text-sm text-gray-500">
					<Icon
						src={Phone}
						theme="solid"
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					{organization.phone ?? ''}
				</p>
			</div>
		</div>
	</div>
</a> -->
