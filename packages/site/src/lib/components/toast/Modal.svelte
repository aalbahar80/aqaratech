<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	// Example from: https://github.com/ivanhofer/sveltekit-typescript-showcase/blob/b334e865894ac9d7c3673168e0ee6d3f7f1806e3/src/01-props/09-svelte-component/Component.svelte#L26

	interface ModalContent {
		title: string;
		description: string;
		onConfirm: () => Promise<void>;
		deletePrompt: string;
	}

	/**
	 * A store that holds the content of the modal. Set the modal to `undefined` to close it.
	 */
	const isOpen = writable<ModalContent | undefined>(undefined);

	export const closeModal = () => {
		isOpen.set(undefined);
	};

	export const openModal = (content: ModalContent) => {
		isOpen.set(content);
	};
</script>

<script lang="ts">
	import Spinner from '$components/Spinner.svelte';
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle,
	} from '@rgossiaux/svelte-headlessui';
	import HeroiconsExclamationTriangle from '~icons/heroicons/exclamation-triangle';

	let promptInput = '';
	let isLoading = false;

	const handleConfirm = async () => {
		isLoading = true;
		if (!$isOpen) {
			throw new Error('Modal is not open');
		}
		await $isOpen.onConfirm();
		isLoading = false;
		closeModal();
	};
	$: console.log($isOpen, 'Modal.svelte ~ 30');
</script>

{#if $isOpen}
	<!-- Dialog.onClose is called when clicking outside -->
	<Dialog
		open
		static
		on:close={closeModal}
		class="fixed inset-0 z-10 overflow-y-auto"
	>
		<div
			class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<DialogOverlay
				class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
			/>
			<!-- {/* This element is to trick the browser into centering the modal contents. */} -->
			<span
				class="hidden sm:inline-block sm:h-screen sm:align-middle"
				aria-hidden="true"
			>
				&#8203;
			</span>
			{#if $isOpen}
				<div
					class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
				>
					<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div class="sm:flex sm:items-start">
							<div
								class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
							>
								<HeroiconsExclamationTriangle
									class="h-6 w-6 text-red-600"
									aria-hidden="true"
								/>
							</div>
							<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<DialogTitle
									as="h3"
									class="text-lg font-medium leading-6 text-gray-900"
								>
									{$isOpen.title}
								</DialogTitle>
								<div class="mt-2">
									<DialogDescription class="flex flex-col gap-2 text-gray-500">
										<p>
											{$isOpen.description}
											{#if $isOpen.deletePrompt}
												This action <strong>cannot</strong> be undone. This will
												permanently delete the
												<strong>{$isOpen.deletePrompt}</strong> organization and
												all of its data.

												<small class="block pt-4 pb-1">
													Please type <strong class="inline"
														>`{$isOpen.deletePrompt}`</strong
													>
													to confirm
												</small>

												<input
													type="text"
													bind:value={promptInput}
													placeholder={$isOpen.deletePrompt}
													class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												/>
											{/if}
										</p>
									</DialogDescription>
								</div>
							</div>
						</div>
					</div>
					<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
						<button
							type="button"
							class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
							on:click={closeModal}
						>
							Cancel
						</button>
						<button
							type="button"
							data-testid="confirm"
							class="order-first mt-3 inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
							disabled={$isOpen.deletePrompt !== '' &&
								promptInput !== $isOpen.deletePrompt}
							on:click={handleConfirm}
						>
							<Spinner loading={isLoading} />
							Delete
						</button>
					</div>
				</div>
			{/if}
		</div>
	</Dialog>
{/if}
