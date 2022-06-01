<script context="module" lang="ts">
	import Select from '$components/Select.svelte';
	import { isTRPCError } from '$lib/client/is-trpc-error';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import { addToast } from '$lib/stores/toast';
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const { categories, groups } = await trpc(fetch).query(
			'public:expenses:meta',
		);
		return { props: { groups, categories } };
	};
</script>

<script lang="ts">
	export let groups: InferQueryOutput<'public:expenses:meta'>['groups'];
	export let categories: InferQueryOutput<'public:expenses:meta'>['categories'];

	const fetchGroups = async () => {
		({ groups } = await trpc().query('public:expenses:meta'));
		return groups;
	};

	const fetchCategories = async () => {
		({ categories } = await trpc().query('public:expenses:meta'));
		return categories;
	};
	$: console.log(categories, 'categories');
	const addGroup = async () => {
		groups = [...groups, { en: '', ar: '' }];
	};
</script>

<h1>Expense Groups</h1>
{#each groups as group}
	<div class="flex flex-col gap-4 sm:h-10 sm:flex-row">
		<input type="text" bind:value={group.en} />
		<input type="text" bind:value={group.ar} />

		<AsyncButton
			func={async () => {
				const { id } = await trpc().mutation('expenseMeta:group:save', group);
				group.id = id;
			}}
			let:loading
		>
			<Button text={'Save'} {loading} --min-width="100px" />
		</AsyncButton>

		<div class="w-1/12 self-center text-red-300">
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

<Button text={'New'} on:click={() => addGroup()} />

<h1>Expense Categories</h1>
{#each categories as cat}
	<div class="flex flex-col gap-4 sm:h-10 sm:flex-row">
		<input type="text" bind:value={cat.en} />
		<input type="text" bind:value={cat.ar} />
		<Select
			id="categoryId"
			bind:current={cat.groupId}
			options={groups.map((i) => ({
				label: `${i.en} - ${i.ar}`,
				value: i.id,
			}))}
			on:select
		/>

		<AsyncButton
			func={async () => {
				const { id } = await trpc().mutation('expenseMeta:category:save', cat);
				cat.id = id;
			}}
			let:loading
		>
			<Button text={'Save'} {loading} --min-width="100px" />
		</AsyncButton>

		<div class="w-1/12 self-center text-red-300">
			{#if cat.id}
				<AsyncButton
					func={async () => {
						try {
							await trpc().mutation('expenseMeta:category:delete', cat.id);
							await fetchCategories();
						} catch (e) {
							if (isTRPCError(e) && e.data?.prismaError?.code === 'P2014') {
								addToast({
									props: {
										kind: 'error',
										title: 'Error',
										subtitle:
											'Cannot delete category because it is used by existing expenses.',
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

<style lang="postcss">
	input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
	}
</style>
