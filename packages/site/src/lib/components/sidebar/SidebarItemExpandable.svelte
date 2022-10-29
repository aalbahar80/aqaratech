<script lang="ts">
	import SidebarItem from '$lib/components/sidebar/SidebarItem.svelte';

	export let text: string;
</script>

<SidebarItem {text}>
	<div slot="trailing">
		<!-- Expandable -->
		<div
			class="xxl:px-1 ml-auto cursor-pointer border-l border-gray-300 px-2"
			aria-expanded="true"
		>
			<svg
				class="h-5 w-5 rotate-90 text-gray-300 text-gray-400"
				viewBox="0 0 20 20"
				style="max-width: 20px"
				><path d="M6 6L14 10L6 14V6Z" fill="currentColor" /></svg
			>
		</div>

		<slot name="trailing" />
	</div>
</SidebarItem>
