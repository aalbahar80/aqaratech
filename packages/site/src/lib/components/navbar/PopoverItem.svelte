<script lang="ts">
	interface MenuOption {
		label: string;
	}

	export let option: MenuOption;
</script>

<div
	class="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
>
	{option.label}
</div>
