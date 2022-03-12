<script lang="ts">
	import {
		RadioGroupDescription,
		RadioGroup,
		RadioGroupLabel,
		RadioGroupOption,
	} from '@rgossiaux/svelte-headlessui';

	const mailingLists = [
		{
			id: 1,
			title: 'Newsletter',
			description: 'Last message sent an hour ago',
			users: '621 users',
		},
		{
			id: 2,
			title: 'Existing Customers',
			description: 'Last message sent 2 weeks ago',
			users: '1200 users',
		},
		{
			id: 3,
			title: 'Trial Users',
			description: 'Last message sent 4 days ago',
			users: '2740 users',
		},
	];

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(' ');
	}
</script>

<RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists}>
	<RadioGroupLabel class="text-base font-medium text-gray-900"
		>Select a mailing list</RadioGroupLabel
	>

	<div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
		{#each mailingLists as mailingList (mailingList.id)}
			<RadioGroupOption
				value={mailingList}
				class={({ checked, active }) =>
					classNames(
						checked ? 'border-transparent' : 'border-gray-300',
						active ? 'border-indigo-500 ring-2 ring-indigo-500' : '',
						'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none',
					)}
				let:checked
				let:active
			>
				<div class="flex flex-1">
					<div class="flex flex-col">
						<RadioGroupLabel
							as="span"
							class="block text-sm font-medium text-gray-900"
						>
							{mailingList.title}
						</RadioGroupLabel>
						<RadioGroupDescription
							as="span"
							class="mt-1 flex items-center text-sm text-gray-500"
						>
							{mailingList.description}
						</RadioGroupDescription>
						<RadioGroupDescription
							as="span"
							class="mt-6 text-sm font-medium text-gray-900"
						>
							{mailingList.users}
						</RadioGroupDescription>
					</div>
				</div>
				<!-- <CheckCircleIcon
					class={classNames(
						!checked ? 'invisible' : '',
						'h-5 w-5 text-indigo-600',
					)}
					aria-hidden="true"
				/> -->
				<div
					class={classNames(
						active ? 'border' : 'border-2',
						checked ? 'border-indigo-500' : 'border-transparent',
						'pointer-events-none absolute -inset-px rounded-lg',
					)}
					aria-hidden="true"
				/>
			</RadioGroupOption>
		{/each}
	</div>
</RadioGroup>
