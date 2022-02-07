<script lang="ts">
	import TWForm from './TWForm.svelte';
	import {
		Transition,
		TransitionChild,
		Dialog,
		DialogOverlay,
	} from '@rgossiaux/svelte-headlessui';

	export let isOpen: boolean = false;
	export let formData: Record<string, unknown>;
</script>

<Transition show={isOpen} as="div">
	<Dialog as="div" class="fixed inset-0 overflow-hidden" on:close>
		<div class="absolute inset-0 overflow-hidden">
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
						<TWForm {formData} />
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
