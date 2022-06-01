<script context="module" lang="ts">
	import Select from '$components/Select.svelte';
	import Spinner from '$components/Spinner.svelte';
	import { trpc, type InferQueryOutput } from '$lib/client/trpc';
	import AsyncButton from '$lib/components/AsyncButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { Load } from '@sveltejs/kit';
	import { Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { flip } from 'svelte/animate';
	import { tick } from 'svelte';
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
		groups = [...groups, { id: '', en: '', ar: '' }];
	};
</script>

<h1>Expense Groups</h1>
{#each groups as group}
	<div class="flex gap-4">
		<input type="text" bind:value={group.en} class="form__input" />
		<input type="text" bind:value={group.ar} class="form__input" />

		<AsyncButton
			func={() => trpc().mutation('expenseMeta:group:save', group)}
			let:loading
		>
			<Button text={'Save'} {loading} />
		</AsyncButton>

		<AsyncButton
			func={() => trpc().mutation('expenseMeta:group:save', group)}
			let:loading
		>
			{#if !loading}
				<button
					class="w-1/12"
					on:click={async () => {
						if (group.id) {
							await trpc().mutation('expenseMeta:group:delete', group.id);
							await fetchGroups();
						} else {
							groups = groups.filter(({ id }) => id !== group.id);
						}
					}}
				>
					<Icon
						src={Trash}
						class="mr-1.5 h-5 w-5 flex-shrink-0 text-red-300"
						aria-hidden="true"
					/>
				</button>
			{:else}
				<Spinner />
			{/if}
		</AsyncButton>
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
	.form__input--invalid {
		@apply border-pink-500 text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500;
	}

	/* Remove arrow steppers */
	/* Firefox */
	input[type='number']:not([id='cycleCount']) {
		-moz-appearance: textfield;
	}
	/* Chrome, Safari, Edge, Opera */
	input:not([id='cycleCount'])::-webkit-outer-spin-button,
	input:not([id='cycleCount'])::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
