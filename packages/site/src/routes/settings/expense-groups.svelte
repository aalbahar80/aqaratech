<script context="module" lang="ts">
	import Spinner from '$components/Spinner.svelte';
	import { isTRPCError } from '$lib/client/is-trpc-error';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import { addToast } from '$lib/stores/toast';
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const { groups } = await trpc(fetch).query('public:expenses:meta');
		return { props: { groups } };
	};
</script>

<script lang="ts">
	export let groups: InferQueryOutput<'public:expenses:meta'>['groups'];

	const fetchGroups = async () => {
		({ groups } = await trpc().query('public:expenses:meta'));
		return groups;
	};

	$: console.log(groups, 'groups');
	const addGroup = async () => {
		groups = [...groups, { id: undefined, en: '', ar: '' }];
	};
</script>

<div class="flex flex-col gap-4 pt-4">
	<h1 class="text-lg font-medium leading-6 text-gray-900">Expense Groups</h1>

	{#each groups as group}
		<div class="flex flex-col gap-4 sm:h-10 sm:flex-row">
			<input type="text" placeholder="English" bind:value={group.en} />
			<input
				type="text"
				placeholder="العربية"
				dir="rtl"
				bind:value={group.ar}
			/>

			<AsyncButton
				func={async () => {
					const { id } = await trpc().mutation('expenseMeta:group:save', group);
					group.id = id;
				}}
				let:loading
			>
				<button
					type="button"
					class="inline-flex w-3/12 items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					Save
					<Spinner {loading} />
				</button>
			</AsyncButton>

			<div class="w-1/12 text-red-300 sm:w-2/12 sm:self-center">
				{#if group.id}
					<AsyncButton
						func={async () => {
							try {
								await trpc().mutation('expenseMeta:group:delete', group.id);
								await fetchGroups();
							} catch (e) {
								if (isTRPCError(e) && e.data?.prismaError?.code === 'P2014') {
									addToast({
										props: {
											kind: 'error',
											title: 'Error',
											subtitle:
												'Cannot delete group because it is used by one or more expense categories. Change those categories then try again.',
										},
									});
								}
							}
						}}
						let:loading
					>
						{#if !loading}
							<Icon src={Trash} aria-hidden="true" />
						{:else}
							<svg
								class="animate-spin"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4"
								/>
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
						{/if}
					</AsyncButton>
				{/if}
			</div>
		</div>
	{/each}

	<button
		type="button"
		class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-6 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
		on:click={() => addGroup()}
	>
		New
	</button>
</div>

<style lang="postcss">
	input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
	}
</style>
