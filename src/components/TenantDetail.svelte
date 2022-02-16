<script lang="ts">
	import type { TenantBrowse } from '$lib/definitions/select';
	import { concatIfExists } from '$lib/utils/table-utils';
	import { PaperClip } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Jsonify } from 'type-fest';
	import ButtonDropdown from './ButtonDropdown.svelte';

	export let tenant: Jsonify<TenantBrowse>;
</script>

<div class="mt-6 overflow-hidden bg-white shadow sm:rounded-lg">
	<div class="px-4 py-5 sm:px-6">
		<h3 class="text-lg font-medium leading-6 text-gray-900">
			Tenant Information
		</h3>
		<p class="mt-1 max-w-2xl text-sm text-gray-500">
			Personal details and application.
		</p>
	</div>
	<div class="border-t border-gray-200">
		<dl>
			<div class="row">
				<dt class="label">Full name</dt>
				<dd class="definition">
					{concatIfExists([
						tenant.firstName,
						tenant.secondName,
						tenant.lastName,
					])}
				</dd>
			</div>
			<div class="row">
				<dt class="label">Phone</dt>
				<dd class="definition">
					{tenant.phone}
				</dd>
			</div>
			<div class="row">
				<dt class="label">Email</dt>
				<dd class="definition">
					{tenant.email}
				</dd>
			</div>
			<div class="row">
				<dt class="label">Civil Id</dt>
				<dd class="definition">
					{tenant.civilid}
				</dd>
			</div>
			<div class="row">
				<dt class="label">Files</dt>
				<dd class="definition">
					<ul
						class="divide-y divide-gray-200 rounded-md border border-gray-200"
					>
						<li
							class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
						>
							<div class="flex w-0 flex-1 items-center">
								<Icon
									src={PaperClip}
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								<span class="ml-2 w-0 flex-1 truncate">civil_id.pdf</span>
							</div>
							<div class="ml-4 flex-shrink-0">
								<ButtonDropdown />
							</div>
						</li>
						<li
							class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
						>
							<div class="flex w-0 flex-1 items-center">
								<Icon
									src={PaperClip}
									class="h-5 w-5 flex-shrink-0 text-gray-400"
									aria-hidden="true"
								/>
								<span class="ml-2 w-0 flex-1 truncate">passport.pdf</span>
							</div>
							<ButtonDropdown />
						</li>
					</ul>
				</dd>
			</div>
		</dl>
	</div>
</div>

<style lang="postcss">
	.row {
		@apply px-4 py-5 odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
	}
	.label {
		@apply text-sm font-medium text-gray-500;
	}
	.definition {
		@apply mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0;
	}
</style>
