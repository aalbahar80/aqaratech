<script lang="ts">
	import TWInput from './TWInput.svelte';

	import {
		Transition,
		TransitionChild,
		Dialog,
		DialogOverlay,
		DialogTitle,
	} from '@rgossiaux/svelte-headlessui';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Link, X, QuestionMarkCircle } from '@steeze-ui/heroicons';

	let isOpen = true;
	const close = () => {
		isOpen = false;
	};

	const open = () => {
		isOpen = true;
	};
</script>

<button
	class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	on:click={() => (isOpen = !isOpen)}
>
	New
</button>

<Transition show={isOpen} as="div">
	<Dialog
		as="div"
		class="fixed inset-0 overflow-hidden"
		open={isOpen}
		on:close={close}
	>
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
							class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
						>
							<div class="h-0 flex-1 overflow-y-auto">
								<div class="bg-indigo-700 py-6 px-4 sm:px-6">
									<div class="flex items-center justify-between">
										<DialogTitle class="text-lg font-medium text-white"
											>New Project</DialogTitle
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
									<div class="mt-1">
										<p class="text-sm text-indigo-300">
											Get started by filling in the information below to create
											your new project.
										</p>
									</div>
								</div>
								<div class="flex flex-1 flex-col justify-between">
									<div class="divide-y divide-gray-200 px-4 sm:px-6">
										<div class="space-y-6 pt-6 pb-5">
											<TWInput />
											<TWInput />
											<TWInput />
											<TWInput />
											<div>
												<label
													for="description"
													class="block text-sm font-medium text-gray-900"
												>
													Description
												</label>
												<div class="mt-1">
													<textarea
														id="description"
														name="description"
														rows={4}
														class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													/>
												</div>
											</div>
											<fieldset>
												<legend class="text-sm font-medium text-gray-900"
													>Privacy</legend
												>
												<div class="mt-2 space-y-5">
													<div class="relative flex items-start">
														<div class="absolute flex h-5 items-center">
															<input
																id="privacy-public"
																name="privacy"
																aria-describedby="privacy-public-description"
																type="radio"
																class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
															/>
														</div>
														<div class="pl-7 text-sm">
															<label
																for="privacy-public"
																class="font-medium text-gray-900"
															>
																Public access
															</label>
															<p
																id="privacy-public-description"
																class="text-gray-500"
															>
																Everyone with the link will see this project.
															</p>
														</div>
													</div>
													<div>
														<div class="relative flex items-start">
															<div class="absolute flex h-5 items-center">
																<input
																	id="privacy-private-to-project"
																	name="privacy"
																	aria-describedby="privacy-private-to-project-description"
																	type="radio"
																	class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
																/>
															</div>
															<div class="pl-7 text-sm">
																<label
																	for="privacy-private-to-project"
																	class="font-medium text-gray-900"
																>
																	Private to project members
																</label>
																<p
																	id="privacy-private-to-project-description"
																	class="text-gray-500"
																>
																	Only members of this project would be able to
																	access.
																</p>
															</div>
														</div>
													</div>
													<div>
														<div class="relative flex items-start">
															<div class="absolute flex h-5 items-center">
																<input
																	id="privacy-private"
																	name="privacy"
																	aria-describedby="privacy-private-to-project-description"
																	type="radio"
																	class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
																/>
															</div>
															<div class="pl-7 text-sm">
																<label
																	for="privacy-private"
																	class="font-medium text-gray-900"
																>
																	Private to you
																</label>
																<p
																	id="privacy-private-description"
																	class="text-gray-500"
																>
																	You are the only one able to access this
																	project.
																</p>
															</div>
														</div>
													</div>
												</div>
											</fieldset>
										</div>
										<div class="pt-4 pb-6">
											<div class="flex text-sm">
												<a
													href="#"
													class="group inline-flex items-center font-medium text-indigo-600 hover:text-indigo-900"
												>
													<Icon
														src={Link}
														class="h-5 w-5 text-indigo-500 group-hover:text-indigo-900"
														aria-hidden="true"
													/>
													<span class="ml-2">Copy link</span>
												</a>
											</div>
											<div class="mt-4 flex text-sm">
												<a
													href="#"
													class="group inline-flex items-center text-gray-500 hover:text-gray-900"
												>
													<Icon
														src={QuestionMarkCircle}
														class="h-5 w-5 text-gray-400 group-hover:text-gray-500"
														aria-hidden="true"
													/>
													<span class="ml-2">Learn more about sharing</span>
												</a>
											</div>
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
