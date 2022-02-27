<script lang="ts">
	import type { InferQueryOutput } from '$lib/client/trpc';
	import {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import {
		Briefcase,
		Calendar,
		Check,
		ChevronDown,
		ChevronRight,
		CurrencyDollar,
		Link,
		LocationMarker,
		Pencil,
		Trash,
	} from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import BreadCrumb from '../breadcrumbs/BreadCrumb.svelte';
	import ButtonDropdown from '../ButtonDropdown.svelte';

	type Lease = NonNullable<InferQueryOutput<'leases:read'>>;
	export let lease: Lease;
	export let isOpen: boolean;

	const openModal = () => {
		isOpen = true;
	};
</script>

<div class="lg:flex lg:items-center lg:justify-between">
	<div class="min-w-0 flex-1">
		<BreadCrumb
			crumbs={[
				['clients', lease.unit?.property?.client?.id],
				['properties', lease.unit?.property?.id],
				['units', lease.unit?.id],
			]}
		/>
		<h2
			class="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl"
		>
			Lease
		</h2>
		<div
			class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
		>
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<Icon
					src={Briefcase}
					theme="solid"
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				Full-time
			</div>
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<Icon
					src={LocationMarker}
					theme="solid"
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				Remote
			</div>
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<Icon
					src={CurrencyDollar}
					theme="solid"
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				$120k &ndash; $140k
			</div>
			<div class="mt-2 flex items-center text-sm text-gray-500">
				<Icon
					src={Calendar}
					theme="solid"
					class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
					aria-hidden="true"
				/>
				Closing on January 9, 2020
			</div>
		</div>
	</div>
	<div class="mt-5 flex lg:mt-0 lg:ml-4">
		<span class="hidden sm:block">
			<button
				type="button"
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<Icon
					src={Pencil}
					theme="solid"
					class="-ml-1 mr-2 h-5 w-5 text-gray-500"
					aria-hidden="true"
				/>
				Edit
			</button>
		</span>

		<span class="ml-3 hidden sm:block">
			<button
				type="button"
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<Icon
					src={Link}
					theme="solid"
					class="-ml-1 mr-2 h-5 w-5 text-gray-500"
					aria-hidden="true"
				/>
				View
			</button>
		</span>

		<span class="ml-3 hidden sm:block">
			<ButtonDropdown
				defaultOption={{
					label: 'Edit',
					href: `/leases/${lease.id}/edit`,
				}}
				options={[
					{
						label: 'Delete',
						icon: Trash,
						onClick: openModal,
					},
				]}
			/>
		</span>
		<span class="sm:ml-3">
			<button
				type="button"
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				<Icon
					src={Check}
					theme="solid"
					class="-ml-1 mr-2 h-5 w-5"
					aria-hidden="true"
				/>
				Publish
			</button>
		</span>

		<!-- {/* Dropdown */} -->
		<Menu as="span" class="relative ml-3 sm:hidden">
			<MenuButton
				class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				More
				<Icon
					src={ChevronDown}
					theme="solid"
					class="-mr-1 ml-2 h-5 w-5 text-gray-500"
					aria-hidden="true"
				/>
			</MenuButton>

			<Transition
				enter="transition ease-out duration-200"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<MenuItems
					class="absolute right-0 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
				>
					<MenuItem let:active>
						<a
							href="#"
							class="block px-4 py-2 text-sm text-gray-700"
							class:bg-gray-100={active}
						>
							Edit
						</a>
					</MenuItem>
					<MenuItem let:active>
						<a
							href="#"
							class="block px-4 py-2 text-sm text-gray-700"
							class:bg-gray-100={active}
						>
							View
						</a>
					</MenuItem>
				</MenuItems>
			</Transition>
		</Menu>
	</div>
</div>
