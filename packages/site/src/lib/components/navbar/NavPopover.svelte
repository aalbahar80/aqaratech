<script lang="ts">
	import { page } from '$app/stores';
	import { getNavOptions } from '$lib/components/navbar/nav-links';
	import PopoverItem from '$lib/components/navbar/PopoverItem.svelte';
	import { LOGIN } from '$lib/constants/routes';
	import type { UserMeta } from '$lib/models/types/auth.type';
	import {
		Popover,
		PopoverButton,
		PopoverPanel,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { Menu, X } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	// Replace type once $page.data is automatically types
	export let navigation: NonNullable<UserMeta['navLinks']>;
</script>

<Popover as="header" let:close>
	<!-- Popover can be a slot in the future -->
	<PopoverButton
		class="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
	>
		<span class="sr-only">Open main menu</span>
		<Icon src={Menu} class="h-6 w-6" aria-hidden="true" />
	</PopoverButton>

	<Transition
		enter="duration-150 ease-out fixed top-0 left-0 right-0 w-full z-20"
		enterFrom="opacity-0 scale-95"
		enterTo="opacity-100 scale-100"
		leave="duration-100 ease-in fixed top-0 left-0 right-0 w-full z-20"
		leaveFrom="opacity-100 scale-100"
		leaveTo="opacity-0 scale-95"
	>
		<PopoverPanel
			class="fixed top-0 left-0 right-0 z-20 w-full transform p-2 transition"
		>
			<div
				class="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5"
			>
				<div class="flex items-center justify-between px-5 pt-4">
					<div>
						<img
							class="h-8 w-auto"
							src="/placeholders/workflow-mark-teal-500-cyan-600.svg"
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
						<!-- Entity nav links -->
						{#each navigation as option (option.label)}
							<a
								on:click={() => close(null)}
								sveltekit:prefetch
								href={option.href}
							>
								<PopoverItem option={{ label: option.label }} />
							</a>
						{/each}

						<!-- General nav links -->
						{#each getNavOptions($page.data.user) as option (option.label)}
							{#if !option.hideOnPopover}
								<a
									href={option.href}
									sveltekit:reload={option.external || true}
									on:click={() => close(null)}
								>
									<PopoverItem option={{ label: option.label }} />
								</a>
							{/if}
						{/each}
					</div>

					{#if !$page.data.isAuthenticated}
						<div class="mt-6 px-5">
							<a
								href={LOGIN}
								sveltekit:reload
								class="block w-full rounded-md bg-gradient-to-r from-teal-500 to-cyan-600 py-3 px-4 text-center font-medium text-white shadow hover:from-teal-600 hover:to-cyan-700"
							>
								Login
							</a>
						</div>
					{/if}
				</div>
			</div>
		</PopoverPanel>
	</Transition>
</Popover>
