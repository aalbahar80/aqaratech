<script lang="ts">
	export let expanded = false;
</script>

<div
	class="ml-auto cursor-pointer border-l border-gray-300 px-2 2xl:px-1"
	aria-expanded="true"
>
	<svg
		class="h-5 w-5 text-gray-300"
		class:rotate-90={expanded}
		viewBox="0 0 20 20"
		style="max-width: 20px"
		><path d="M6 6L14 10L6 14V6Z" fill="currentColor" /></svg
	>
</div>
