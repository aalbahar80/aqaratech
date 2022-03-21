<script lang="ts">
	import { Menu, X } from '@steeze-ui/heroicons';
	import {
		Popover,
		PopoverButton,
		PopoverPanel,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { Icon } from '@steeze-ui/svelte-icon';

	const navigation = [
		{ name: 'Clients', href: '/clients' },
		{ name: 'Properties', href: '/properties' },
		{ name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		{ name: 'Tenants', href: '/tenants' },
		// { name: 'Transactions', href: '/transactions' },
		{ name: 'Maintenance', href: '/maintenanceOrders' },
	];
</script>

<Popover as="header" class="relative" let:close>
	<div class="bg-gray-900 py-6">
		<nav
			class="relative mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6"
			aria-label="Global"
		>
			<div class="flex flex-1 items-center">
				<div class="flex w-full items-center justify-between md:w-auto">
					<a href="/">
						<span class="sr-only">Workflow</span>
						<img
							class="h-8 w-auto sm:h-10"
							src="https://tailwindui.com/img/logos/workflow-mark-teal-200-cyan-400.svg"
							alt=""
						/>
					</a>
					<div class="-mr-2 flex items-center md:hidden">
						<PopoverButton
							class="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
						>
							<span class="sr-only">Open main menu</span>
							<Icon src={Menu} class="h-6 w-6" aria-hidden="true" />
						</PopoverButton>
					</div>
				</div>

				<!-- navbar 1 -->
				<div class="hidden space-x-8 md:ml-10 md:flex">
					{#each navigation as item (item.name)}
						<a
							sveltekit:prefetch
							href={item.href}
							class="text-base font-medium text-white hover:text-gray-300"
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>
			<div class="hidden md:flex md:items-center md:space-x-6">
				<a
					href="/"
					class="text-base font-medium text-white hover:text-gray-300"
				>
					Log in
				</a>
				<a
					href="/"
					class="inline-flex items-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white hover:bg-gray-700"
				>
					Start free trial
				</a>
			</div>
		</nav>
	</div>

	<!-- TODO Transition Here -->
	<!-- Hamburger Menu -->
	<PopoverPanel
		focus
		class="absolute inset-x-0 top-0 origin-top transform p-2 transition md:hidden"
	>
		<div
			class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5"
		>
			<div class="flex items-center justify-between px-5 pt-4">
				<div>
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-teal-500-cyan-600.svg"
						alt=""
					/>
				</div>
				<div class="-mr-2">
					<PopoverButton
						class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-600"
					>
						<span class="sr-only">Close menu</span>
						<Icon class="h-6 w-6" aria-hidden="true" src={X} />
					</PopoverButton>
				</div>
			</div>
			<div class="pt-5 pb-6">
				<div class="space-y-1 px-2">
					{#each navigation as item (item.name)}
						<a
							on:click={() => close(null)}
							sveltekit:prefetch
							href={item.href}
							class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
						>
							{item.name}
						</a>
					{/each}
				</div>
				<div class="mt-6 px-5">
					<a
						href="/"
						class="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
					>
						Start free trial
					</a>
				</div>
				<div class="mt-6 px-5">
					<p class="text-center text-base font-medium text-gray-500">
						Existing customer?{' '}
						<a href="/" class="text-gray-900 hover:underline"> Login </a>
					</p>
				</div>
			</div>
		</div>
	</PopoverPanel>
</Popover>
