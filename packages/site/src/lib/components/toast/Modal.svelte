<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	const isOpen = writable(false);

	export const closeModal = () => {
		console.log('Closing modal'); // TODO rm
		isOpen.set(false);
	};

	export const openModal = () => {
		console.log('Opening modal'); // TODO rm
		isOpen.set(true);
	};
</script>

<script lang="ts">
	import Spinner from '$components/Spinner.svelte';
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild,
	} from '@rgossiaux/svelte-headlessui';
	import HeroiconsExclamationTriangle from '~icons/heroicons/exclamation-triangle';

	export let isLoading: boolean;
	export let handleConfirm: () => Promise<void>;
	export let title: string;
	export let description = '';
	export let deletePrompt = '';

	let promptInput = '';
</script>

<Transition show={$isOpen}>
	<Dialog on:close={closeModal} class="fixed inset-0 z-10 overflow-y-auto">
		<div
			class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
		>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay
					class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
				/>
			</TransitionChild>
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<!-- {/* This element is to trick the browser into centering the modal contents. */} -->
				<span
					class="hidden sm:inline-block sm:h-screen sm:align-middle"
					aria-hidden="true"
				>
					&#8203;
				</span>
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
									{title}
								</DialogTitle>
								<div class="mt-2">
									<DialogDescription class="flex flex-col gap-2 text-gray-500">
										<p>
											{description}
											{#if deletePrompt}
												This action <strong>cannot</strong> be undone. This will
												permanently delete the
												<strong>{deletePrompt}</strong> organization and all of
												its data.

												<small class="block pt-4 pb-1">
													Please type <strong class="inline"
														>`{deletePrompt}`</strong
													>
													to confirm
												</small>

												<input
													type="text"
													bind:value={promptInput}
													placeholder={deletePrompt}
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
							disabled={deletePrompt !== '' && promptInput !== deletePrompt}
							on:click={handleConfirm}
						>
							<Spinner loading={isLoading} />
							Delete
						</button>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
