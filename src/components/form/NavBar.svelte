<script lang="ts">
	import { page } from '$app/stores';
	import {
		Disclosure,
		DisclosureButton,
		DisclosurePanel,
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { Bell, Menu as MenuIcon, X } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	$: isActive = (href: string) => $page.url.pathname === href;

	const navigation = [
		{ name: 'Clients', href: '/clients' },
		{ name: 'Properties', href: '/property' },
		{ name: 'Units', href: '/units' },
		{ name: 'Leases', href: '/leases' },
		{ name: 'Tenants', href: '/tenant' },
		{ name: 'Transactions', href: '/transactions' },
	];

	const profileNavigation = [
		{ name: 'Team', href: '#' },
		{ name: 'Settings', href: '#' },
		{ name: 'sample/abc', href: '/sample/abc' },
		{ name: 'Sign Out', href: '/auth/logout' },
	];
	function buildClass(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<Disclosure as="nav" let:open class="bg-gray-800">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- {/* Mobile menu button*/} -->
				<DisclosureButton
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
				>
					<span class="sr-only">Open main menu</span>
					{#if open}
						<Icon src={X} class="block h-6 w-6" aria-hidden="true" />
					{:else}
						<Icon src={MenuIcon} class="block h-6 w-6" aria-hidden="true" />
					{/if}
				</DisclosureButton>
			</div>
			<div
				class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
			>
				<div class="flex flex-shrink-0 items-center">
					<img
						class="block h-8 w-auto lg:hidden"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
						alt="Workflow"
					/>
					<a href="/">
						<img
							class="hidden h-8 w-auto lg:block"
							src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
							alt="Workflow"
						/>
					</a>
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						{#each navigation as item (item.name)}
							<a
								href={item.href}
								class={buildClass(
									isActive(item.href)
										? 'bg-gray-900 text-white'
										: 'text-gray-300 hover:bg-gray-700 hover:text-white',
									'rounded-md px-3 py-2 text-sm font-medium',
								)}
								aria-current={isActive(item.href) ? 'page' : undefined}
							>
								{item.name}
							</a>
						{/each}
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<button
					type="button"
					class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					<span class="sr-only">View notifications</span>
					<Icon src={Bell} class="h-6 w-6" aria-hidden="true" />
				</button>

				<!-- {/* Profile dropdown */} -->
				<Menu as="div" class="relative ml-3">
					<div>
						<MenuButton
							class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
						>
							<span class="sr-only">Open user menu</span>
							<img
								class="h-8 w-8 rounded-full"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
						</MenuButton>
					</div>
					<Transition
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<MenuItems
							class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							{#each profileNavigation as navItem (navItem.name)}
								<MenuItem let:active>
									<a
										href="#"
										class={buildClass(
											isActive(navItem.href) ? 'bg-gray-100' : '',
											'block px-4 py-2 text-sm text-gray-700',
										)}
									>
										{navItem.name}
									</a>
								</MenuItem>
							{/each}
						</MenuItems>
					</Transition>
				</Menu>
			</div>
		</div>
	</div>

	<DisclosurePanel class="sm:hidden">
		<div class="space-y-1 px-2 pt-2 pb-3">
			{#each navigation as item (item.name)}
				<DisclosureButton
					key={item.name}
					as="a"
					href={item.href}
					class={buildClass(
						isActive(item.href)
							? 'bg-gray-900 text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white',
						'block rounded-md px-3 py-2 text-base font-medium',
					)}
					aria-current={isActive(item.href) ? 'page' : undefined}
				>
					{item.name}
				</DisclosureButton>
			{/each}
		</div>
	</DisclosurePanel>
</Disclosure>
