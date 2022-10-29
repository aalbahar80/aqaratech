<script lang="ts">
	export let text: string;
</script>

<div
	class="mt-5 flex transform items-center rounded-md px-4 py-2 text-gray-600 transition-colors duration-100 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
>
	<slot />

	<span class="mx-4 font-medium">{text}</span>
</div>
