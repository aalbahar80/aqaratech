<script lang="ts">
	import { enhance } from '$lib/form';
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild,
	} from '@rgossiaux/svelte-headlessui';
	import { X } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import startCase from 'lodash-es/startCase.js';
	import TWInput from './TWInput.svelte';

	export let isOpen: boolean = false;
	export let formData: Record<string, unknown>;
	export let formType: FormType = 'update';
	export let action: string;
	export let patch: (updated: { id: string; [key: string]: unknown }) => void;
	export let create: (created: any) => void;

	const close = () => {
		isOpen = false;
	};

	type Enhance = Parameters<typeof enhance>['1'];
	const createAction: Enhance = {
		result: async (res, form) => {
			// TODO optimistic update just like todos example
			const created = await res.json();
			create(created);
			console.log(created);

			form.reset();
			close();
		},
	};

	const updateAction: Enhance = {
		result: async (res, form) => {
			// TODO optimistic update just like todos example
			const updated = await res.json();
			console.log(updated);
			patch(updated);

			form.reset();
			close();
		},
	};
</script>

<Transition show={isOpen} as="div">
	<Dialog as="div" class="fixed inset-0 overflow-hidden" on:close={close}>
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
						<form
							use:enhance={{
								...(formType === 'create' ? createAction : updateAction),
							}}
							{action}
							method="post"
							class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						>
							<div class="h-0 flex-1 overflow-y-auto">
								<div class="bg-indigo-700 py-6 px-4 sm:px-6">
									<div class="flex items-center justify-between">
										<DialogTitle class="text-lg font-medium text-white"
											>{startCase(formType)} Tenant</DialogTitle
										>
										<div class="ml-3 flex h-7 items-center">
											<button
												type="button"
												class="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
												on:click={close}
											>
												<span class="sr-only">Close panel</span>
												<Icon src={X} class="h-6 w-6" aria-hidden="true" />
											</button>
										</div>
									</div>
								</div>
								<div class="flex flex-1 flex-col justify-between">
									<div class="divide-y divide-gray-200 px-4 sm:px-6">
										<div class="space-y-6 pt-6 pb-5">
											{#each Object.entries(formData) as [name, value] (name)}
												<TWInput {name} {value} />
											{/each}
										</div>
									</div>
								</div>
							</div>
							<div class="flex flex-shrink-0 justify-end px-4 py-4">
								<button
									type="button"
									class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
									on:click={close}
								>
									Cancel
								</button>
								<button
									type="submit"
									class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</TransitionChild>
			</div>
		</div>
	</Dialog>
</Transition>
