<script lang="ts">
	import {
		Dialog,
		DialogDescription,
		DialogOverlay,
		DialogTitle,
	} from '@rgossiaux/svelte-headlessui';
	import { fade } from 'svelte/transition';

	import { onDestroy, onMount, beforeUpdate, afterUpdate, tick } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Exclamation } from '@steeze-ui/heroicons';
	import { goto } from '$app/navigation';

	onDestroy(() => {
		console.warn('destroyed modal333');
	});
	onMount(() => {
		console.log('mounted modal333');
	});
	beforeUpdate(() => {
		console.log('before update modal333');
	});
	afterUpdate(() => {});
	console.log('after update modal333');

	let isOpen: boolean = true;
</script>

<Dialog
	open={isOpen}
	on:close={() => (isOpen = false)}
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
		<div
			class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
		>
			<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start">
					<div
						class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
					>
						<Icon
							src={Exclamation}
							class="h-6 w-6 text-red-600"
							aria-hidden="true"
						/>
					</div>
					<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
						<DialogTitle
							as="h3"
							class="text-lg font-medium leading-6 text-gray-900"
						>
							Deactivate account
						</DialogTitle>
						<div class="mt-2">
							<p class="text-sm text-gray-500">
								Are you sure you want to deactivate your account? All of your
								data will be permanently removed. This action cannot be undone.
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
				<button
					type="button"
					class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
					on:click={() => goto('/leases')}
				>
					Delete
				</button>
				<button
					type="button"
					class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
					on:click={() => (isOpen = false)}
				>
					<!-- bind:this={cancelButton} -->
					Cancel
				</button>
			</div>
		</div>
	</div>
</Dialog>
