<script lang="ts">
	import SearchPalette from '$lib/components/search/SearchPalette.svelte';
	import { shortcut } from '$lib/utils/shortcut';

	let open = false;
</script>

<!-- https://daisyui.com/components/kbd/ -->

<button
	class="flex w-full items-center rounded-md border bg-white p-2 text-gray-700 hover:border-blue-400 hover:outline-none hover:ring hover:ring-blue-300 hover:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-blue-300"
	use:shortcut={{ control: true, code: 'KeyK' }}
	on:click={() => {
		open = true;
	}}
>
	<svg
		class="mr-3 h-5 w-5 flex-none text-gray-400"
		viewBox="0 0 24 24"
		fill="none"
	>
		<path
			d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>

	Search
	<kbd class="ml-auto flex-none pl-3 font-sans">
		<abbr title="Command" class="no-underline">⌘</abbr> K
	</kbd>
</button>
<SearchPalette bind:open />
