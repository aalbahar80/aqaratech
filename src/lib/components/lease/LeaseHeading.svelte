<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import ModalDelete from '$lib/components/toast/ModalDelete.svelte';
	import { Calendar, DocumentText, Refresh, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { formatDistance } from 'date-fns';
	import BreadCrumb from '../breadcrumbs/BreadCrumb.svelte';
	import ButtonDropdown from '../ButtonDropdown.svelte';

	type Lease = NonNullable<InferQueryOutput<'leases:read'>>;
	export let lease: Lease;

	let isOpen = false;
	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="lg:flex lg:items-center lg:justify-between">
	<ModalDelete bind:isOpen id={lease.id} entity="leases" />
	<div class="min-w-0 flex-1">
		<BreadCrumb
			crumbs={[
				['clients', lease.unit?.property?.client?.id],
				['properties', lease.unit?.property?.id],
				['units', lease.unit?.id],
				['tenants', lease.tenant?.id],
			]}
		/>
		<div class="mt-2 flex items-center space-x-8">
			<h2
				class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
			>
				Lease
			</h2>
			{#if lease.endDate > new Date()}
				<span
					class="inline-flex h-8 items-center rounded-md bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800"
				>
					Active
				</span>
			{:else}
				<span
					class="inline-flex h-8 items-center rounded-md bg-pink-100 px-2.5 py-0.5 text-sm font-medium text-pink-800"
				>
					Expired
				</span>
			{/if}
		</div>
		<div
			class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
		>
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<Icon
					src={Calendar}
					theme="solid"
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				Expiry: {formatDistance(lease.endDate, new Date(), {
					addSuffix: true,
				})}
			</div>
		</div>
	</div>
	<div class="mt-5 flex lg:mt-0 lg:ml-4">
		<span class="sm:ml-3">
			<a
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				href={`/leases/add?unitId=${lease.unit?.id}&tenantId=${lease.tenant?.id}&monthlyRent=${lease.monthlyRent}`}
			>
				<Icon
					src={Refresh}
					class="-ml-1 mr-2 hidden h-5 w-5 sm:block"
					aria-hidden="true"
				/>
				Renew
			</a>
		</span>

		<span class="ml-3">
			<a
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				href={`/leases/${lease.id}/contract`}
			>
				<Icon
					src={DocumentText}
					class="-ml-1 mr-2 hidden h-5 w-5 sm:block"
					aria-hidden="true"
				/>
				Contract
			</a>
		</span>

		<span class="ml-3">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/leases/${lease.id}/edit`,
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
		</span>
	</div>
</div>
