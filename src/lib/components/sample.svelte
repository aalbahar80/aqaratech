<script lang="ts">
	import { Listbox, ListboxOption } from '@rgossiaux/svelte-headlessui';
	import type { ListboxOptionSlots } from '@rgossiaux/svelte-headlessui/components/listbox/ListboxOption.svelte';

	function classNames(...classes: (string | false | null | undefined)[]) {
		return classes.filter(Boolean).join(' ');
	}

	const myClass = (info: ListboxOptionSlots['default']) => {
		console.log(info.active);
		console.log(info.selected);
		console.log(info.disabled);
		return classNames(
			'bg-blue-300',
			info.active ? 'text-lg text-green-200' : 'text-sm text-red-200',
		);
	};
</script>

<Listbox value="">
	<ListboxOption value="" class={myClass}>
		<div>My stuff here</div>
	</ListboxOption>
</Listbox>
