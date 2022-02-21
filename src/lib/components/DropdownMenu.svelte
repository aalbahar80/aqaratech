<script lang="ts">
	import {
		MenuItem,
		MenuItems,
		Transition,
	} from '@rgossiaux/svelte-headlessui';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/svelte-icon/types';

	type Option = {
		label: string;
		href?: string;
		icon: IconSource;
		onClick?: any;
	};
	export let options: Option[];
</script>

<Transition
	as="div"
	enter="transition ease-out duration-100"
	enterFrom="transform opacity-0 scale-95"
	enterTo="transform opacity-100 scale-100"
	leave="transition ease-in duration-75"
	leaveFrom="transform opacity-100 scale-100"
	leaveTo="transform opacity-0 scale-95"
>
	<!-- class={`absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} -->
	<MenuItems
		class={`${$$props.class} absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
		><div class="py-1">
			{#each options as option (option.label)}
				<MenuItem
					let:active
					as="button"
					class="w-full"
					on:click={() => {
						option.onClick();
					}}
				>
					<div
						class="group flex items-center px-4 py-2 text-sm"
						class:bg-gray-100={active}
						class:text-gray-900={active}
						class:text-gray-700={!active}
					>
						<Icon
							src={option.icon}
							class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
							aria-hidden="true"
							theme="solid"
						/>
						{option.label}
					</div>
				</MenuItem>
			{/each}
		</div>
	</MenuItems>
</Transition>
