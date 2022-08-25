<script lang="ts">
	import SearchPalette from '$lib/components/search/SearchPalette.svelte';
	import { shortcut } from '$lib/utils/shortcut';
	import { Search } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	let open = false;
</script>

<!-- https://daisyui.com/components/kbd/ -->
<!-- use svelte:window to set event listener instead? -->
<button
	class="flex flex-auto justify-center lg:justify-end"
	use:shortcut={{ control: true, code: 'KeyK' }}
	on:click={() => {
		open = true;
	}}
>
	<SearchPalette bind:open />
	<div
		class="w-full max-w-lg lg:max-w-xs"
		on:click={() => {
			open = true;
		}}
	>
		<!-- <div
						class="block w-full max-w-lg rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm lg:max-w-xs"
					> -->
		<div class="relative flex items-center text-gray-400">
			<div
				class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
			>
				<Icon
					src={Search}
					class="h-5 w-5 text-gray-400"
					aria-hidden="true"
					theme="solid"
				/>
			</div>
			<span
				id="search"
				name="search"
				class="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
			>
				Search...
			</span>
			<kbd
				class="absolute right-0 hidden pr-3 font-sans font-semibold sm:block"
			>
				<abbr title="Command" class="no-underline">⌘</abbr> K
			</kbd>
		</div>
	</div>
</button>
