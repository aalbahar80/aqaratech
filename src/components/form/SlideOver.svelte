<script lang="ts">
	import TWForm from './TWForm.svelte';
	import {
		Transition,
		TransitionChild,
		Dialog,
		DialogOverlay,
	} from '@rgossiaux/svelte-headlessui';

	export let isOpen: boolean = false;
	export let someData: Record<string, unknown>;
</script>

<button
	class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	on:click={() => {
		isOpen = !isOpen;
	}}
>
	New Inner
</button>

<Transition show={isOpen} as="div">
	<Dialog as="div" class="fixed inset-0 overflow-hidden" on:close>
		<div class="absolute inset-0  overflow-hidden">
			<DialogOverlay class="absolute inset-0" />

			<div class="fixed inset-y-0 right-0 flex  pl-16">
				<TransitionChild
					as="div"
					enter="transform transition ease-in-out duration-500 sm:duration-700"
					enterFrom="translate-x-full"
					enterTo="translate-x-0"
					leave="transform transition ease-in-out duration-500 sm:duration-700"
					leaveFrom="translate-x-0"
					leaveTo="translate-x-full"
				>
					<div class="h-full w-screen max-w-md ">
						<TWForm {someData} />
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
