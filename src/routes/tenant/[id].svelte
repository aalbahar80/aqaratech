<script lang="ts">
	import {
		Menu,
		MenuButton,
		MenuItem,
		MenuItems,
		Popover,
		PopoverButton,
		PopoverGroup,
		PopoverOverlay,
		PopoverPanel,
		Transition,
		TransitionChild,
	} from '@rgossiaux/svelte-headlessui';
	// Search is solid icon
	import { Search, Bell, Menu as MenuI, X } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const user = {
		name: 'Chelsea Hagon',
		handle: 'chelseahagon',
		email: 'chelseahagon@example.com',
		role: 'Human Resources Manager',
		imageId: '1550525811-e5869dd03032',
		imageUrl:
			'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
	};
	const navigation = [
		{ name: 'Dashboard', href: '#', current: true },
		{ name: 'Calendar', href: '#', current: false },
		{ name: 'Teams', href: '#', current: false },
		{ name: 'Directory', href: '#', current: false },
	];
	const userNavigation = [
		{ name: 'Your Profile', href: '#' },
		{ name: 'Settings', href: '#' },
		{ name: 'Sign out', href: '#' },
	];

	function classes(...classes) {
		return classes.filter(Boolean).join(' ');
	}
	let open = true;
</script>

<div class="min-h-screen bg-gray-100">
	<Popover
		as="header"
		class={classes(
			open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
			'bg-white shadow-sm lg:static lg:overflow-y-visible',
		)}
		let:open
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div
				class="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12"
			>
				<div
					class="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2"
				>
					<div class="flex flex-shrink-0 items-center">
						<a href="#">
							<img
								class="block h-8 w-auto"
								src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
								alt="Workflow"
							/>
						</a>
					</div>
				</div>
				<div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
					<div
						class="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0"
					>
						<div class="w-full">
							<label htmlFor="search" class="sr-only"> Search </label>
							<div class="relative">
								<div
									class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
								>
									<Icon
										src={Search}
										class="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</div>
								<input
									id="search"
									name="search"
									class="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
									placeholder="Search"
									type="search"
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					class="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden"
				>
					<!-- {/* Mobile menu button */} -->
					<PopoverButton
						class="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					>
						<span class="sr-only">Open menu</span>
						{#if open}
							<Icon src={X} class="block h-6 w-6" aria-hidden="true" />
						{:else}
							<Icon src={MenuI} class="block h-6 w-6" aria-hidden="true" />
						{/if}
					</PopoverButton>
				</div>
				<div
					class="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4"
				>
					<a
						href="#"
						class="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						<span class="sr-only">View notifications</span>
						<Icon src={Bell} class="h-6 w-6" aria-hidden="true" />
					</a>

					<!-- {/* Profile dropdown */} -->
					<Menu as="div" class="relative ml-5 flex-shrink-0">
						<div>
							<MenuButton
								class="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								<span class="sr-only">Open user menu</span>
								<img class="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
							</MenuButton>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<MenuItems
								class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								{#each userNavigation as item}
									<!-- content here -->
									<MenuItem let:active key={item.name}>
										<a
											href={item.href}
											class={classes(
												active ? 'bg-gray-100' : '',
												'block py-2 px-4 text-sm text-gray-700',
											)}
										>
											{item.name}
										</a>
									</MenuItem>
								{/each}
							</MenuItems>
						</Transition>
					</Menu>

					<a
						href="#"
						class="ml-6 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						New Project
					</a>
				</div>
			</div>
		</div>

		<PopoverPanel as="nav" class="lg:hidden" aria-label="Global">
			<div class="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
				{#each navigation as item}
					<a
						key={item.name}
						href={item.href}
						aria-current={item.current ? 'page' : undefined}
						class={classes(
							item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
							'block rounded-md py-2 px-3 text-base font-medium',
						)}
					>
						{item.name}
					</a>
				{/each}
			</div>
			<div class="border-t border-gray-200 pt-4 pb-3">
				<div class="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
					<div class="flex-shrink-0">
						<img class="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
					</div>
					<div class="ml-3">
						<div class="text-base font-medium text-gray-800">{user.name}</div>
						<div class="text-sm font-medium text-gray-500">{user.email}</div>
					</div>
					<button
						type="button"
						class="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						<span class="sr-only">View notifications</span>
						<BellIcon class="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<div class="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
					{#each userNavigation as item}
						<a
							key={item.name}
							href={item.href}
							class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
						>
							{item.name}
						</a>
					{/each}
				</div>
			</div>
		</PopoverPanel>
	</Popover>

	<div class="py-6">
		<div
			class="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8"
		>
			<div class="hidden lg:col-span-3 lg:block xl:col-span-2">
				<nav aria-label="Sidebar" class="sticky top-6 divide-y divide-gray-300">
					<!-- {/* Your content */} -->
				</nav>
			</div>
			<!-- <main class="lg:col-span-9 xl:col-span-6">{/* Your content */}</main> -->
			<aside class="hidden xl:col-span-4 xl:block">
				<!-- <div class="sticky top-6 space-y-4">{/* Your content */}</div> -->
			</aside>
		</div>
	</div>
</div>
