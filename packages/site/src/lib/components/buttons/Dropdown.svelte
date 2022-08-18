<script lang="ts">
	import ThreeDotsButton from '$lib/components/buttons/ThreeDotsButton.svelte';
	import { Menu, MenuButton } from '@rgossiaux/svelte-headlessui';
</script>

<Menu as="div" class="relative inline-block text-left align-middle">
	<div class="flex">
		<slot name="beforeButton" />
		<MenuButton>
			<div data-testid="dropdown-menu">
				<slot name="button">
					<ThreeDotsButton />
				</slot>
			</div>
		</MenuButton>
	</div>

	<slot name="menu" />
</Menu>
