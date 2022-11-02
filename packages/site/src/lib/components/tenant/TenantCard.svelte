<script lang="ts">
	import type { TenantDto } from '$api/openapi';
	import { page } from '$app/stores';
	import { orgRoute } from '$lib/utils/route-helpers';
	import { Phone, User } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	export let tenant: TenantDto;
</script>

<a
	href={`${orgRoute($page.params)}/tenants/${tenant.id}`}
	class="block hover:bg-gray-50"
>
	<div class="px-4 py-4 sm:px-6">
		<!-- <div class="flex items-center justify-between">
			<p class="truncate text-sm font-medium text-indigo-600">
				# {tenant.label}
			</p>
			<div class="ml-2 flex flex-shrink-0">
				<Badge label="Active" badgeColor="green" />
			</div>
		</div> -->
		<div class="mt-2 sm:flex sm:justify-between">
			<div class="sm:flex sm:space-x-4">
				<p class="flex items-center text-sm text-gray-500">
					<Icon
						src={User}
						theme="solid"
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
						aria-hidden="true"
					/>
					{tenant.fullName}
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
					{tenant.phone ?? ''}
				</p>
			</div>
		</div>
	</div>
</a>
