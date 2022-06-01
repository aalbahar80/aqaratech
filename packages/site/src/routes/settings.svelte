<script context="module" lang="ts">
	import Select from '$components/Select.svelte';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
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

	$: console.log({ groups }, 'settings.svelte ~ 16');
	const options = categories.map((cat) => ({
		label: `${cat.en} - ${cat.ar}`,
		value: cat.id,
	}));

	const fetchGroups = async () => {
		({ groups } = await trpc().query('public:expenses:meta'));
		return groups;
	};

	const addGroup = async () => {
		groups = [...groups, { en: '', ar: '' }];
	};
</script>

<h1>Expense Groups</h1>
{#each groups as group}
	<div class="flex h-10 gap-4">
		<input type="text" bind:value={group.en} class="form__input" />
		<input type="text" bind:value={group.ar} class="form__input" />

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
						await trpc().mutation('expenseMeta:group:delete', group.id);
						await fetchGroups();
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

<h1>Expense Groups</h1>
{#each categories as cat (cat.id)}
	<div class="flex">
		<input type="text" bind:value={cat.id} />
		<input type="text" value={cat.en} />
		<input type="text" value={cat.ar} />
		<Select
			id="expenseCategoryId"
			current={cat.expenseGroupId}
			{options}
			on:select
		/>
	</div>
{/each}

<style lang="postcss">
	.form__input {
		@apply block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm;
		@apply disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none;
	}
</style>
