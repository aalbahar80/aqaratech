<script lang="ts">
	import { MenuItems, Transition } from '@rgossiaux/svelte-headlessui';
</script>

<Transition
	as="div"
	enter="transition ease-out duration-100 z-10 absolute right-0"
	enterFrom="transform opacity-0 scale-95"
	enterTo="transform opacity-100 scale-100"
	leave="transition ease-in duration-75"
	leaveFrom="transform opacity-100 scale-100"
	leaveTo="transform opacity-0 scale-95"
>
	<MenuItems
		class="absolute right-0 z-20 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
	>
		<slot />
	</MenuItems>
</Transition>
