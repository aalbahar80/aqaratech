<script lang="ts">
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { concatIfExists } from '$lib/utils/table-utils';
	import { PaperClip, Pencil, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	type Tenant = NonNullable<InferQueryOutput<'tenants:read'>>;
	export let tenant: Tenant;

	let isOpen = false;

	const options = [
		{ label: 'Update', href: '#', icon: Pencil },
		{ label: 'Remove', href: '#', icon: Trash },
	];

	const openModal = () => {
		isOpen = true;
	};
</script>

<ModalDelete bind:isOpen id={tenant.id} entity="tenants" />
<section class="rounded-md bg-white shadow">
	<div class="flex justify-between px-4 py-5 sm:px-6">
		<h3 class="text-lg font-medium leading-6 text-gray-900">
			Tenant Information
		</h3>
		<div class="order-last">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/tenants/${tenant.id}/edit`,
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

							<ButtonDropdown
								class="bottom-10"
								defaultOption={{ label: 'View' }}
								{options}
							/>
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

							<ButtonDropdown
								class="bottom-10"
								defaultOption={{ label: 'View' }}
								{options}
							/>
						</li>
					</ul>
				</dd>
			</div>
		</dl>
	</div>
</section>

<style lang="postcss">
	.row {
		@apply px-4 py-5 last:rounded-b-md odd:bg-gray-50 even:bg-white sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6;
	}
	.label {
		@apply text-sm font-medium text-gray-500;
	}
	.definition {
		@apply mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0;
	}
</style>
