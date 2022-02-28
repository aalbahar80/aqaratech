<script lang="ts">
	import ButtonDropdown from '$components/ButtonDropdown.svelte';
	import type { InferQueryOutput } from '$lib/client/trpc';
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { concatIfExists } from '$lib/utils/table-utils';
	import { Trash } from '@steeze-ui/heroicons';

	type Tenant = NonNullable<InferQueryOutput<'tenants:read'>>;
	export let tenant: Tenant;

	let isOpen = false;

	const details: [string, string | null][] = [
		[
			'Full Name',
			concatIfExists([tenant.firstName, tenant.secondName, tenant.lastName]),
		],
		['Phone', tenant.phone],
		['Email', tenant.email],
		['Civil id', tenant.civilid],
	];

	const files: [string, string][] = [
		['Civil Id', ''],
		['Passport', ''],
	];

	const openModal = () => {
		isOpen = true;
	};
</script>

<section class="rounded-md bg-white shadow">
	<ModalDelete bind:isOpen id={tenant.id} entity="tenants" />
	<div class="flex justify-between px-4 py-5 sm:px-6">
		<h3 class="text-lg font-medium leading-6 text-gray-900">
			Tenant Information
		</h3>
		<div class="order-last">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/tenants/${tenant.id}/edit`,
					type: 'link',
				}}
				options={[
					{
						label: 'Delete',
						icon: Trash,
						onClick: openModal,
						type: 'button',
					},
				]}
			/>
		</div>
	</div>
	<DetailsPane {details} {files} />
</section>
