<script lang="ts">
	import { page } from '$app/stores';
	import { svelteReporter } from '@felte/reporter-svelte';
	import { validator } from '@felte/validator-zod';
	import { createForm } from 'felte';
	import isEmpty from 'just-is-empty';
	import { z } from 'zod';
	import TWInput from './TWInput.svelte';
	import startCase from 'lodash-es/startCase.js';
	import { goto } from '$app/navigation';
	import { addToast } from '$lib/stores/toast';

	export let formData: Record<string, any>;
	export let formSchema: any = undefined;
	export let transformer: any = undefined;

	const getSubmitUrl = () => {
		const { entity, id } = $page.params;
		let url;
		if (id) {
			url = `/${entity}/${id}.json?_method=PATCH`;
		} else {
			url = `/${entity}.json`;
		}
		return url;
	};

	const getFormType = () => {
		return $page.url.pathname.split('/').slice(-1)[0];
	};

	const getTitle = () =>
		startCase(
			`${$page.url.pathname.split('/').slice(-1)[0]} ${$page.params.entity}`,
		);

	$: noErrorMsg = Object.values($errors).every((e) => e === null);

	const { form, errors, isSubmitting, reset } = createForm({
		extend: [validator, svelteReporter],
		validateSchema: formSchema || z.object({}),
		onSubmit: async (values) => {
			let { id: _id, ...rest } = values;
			if (transformer) {
				rest = transformer(rest);
			}
			const url = getSubmitUrl();
			try {
				const res = await fetch(url, {
					method: 'POST',
					body: JSON.stringify(rest),
				});
				const data = await res.json();
				addToast({
					props: {
						kind: 'success',
						title: 'Success',
					},
				});
				// goto(`/${$page.params.entity}/${data.id}`);
				reset();
				console.info(await res.json());
			} catch (e) {
				console.error(e);
			}
		},
	});

	const flattenIfArray = (value: any) =>
		Array.isArray(value) ? value[0] : value;
</script>

<svelte:head>
	<title>{getTitle()}</title>
</svelte:head>

{getSubmitUrl()}
<div class="mx-auto mt-8 h-full max-w-xl">
	<form
		use:form
		class="flex h-full flex-col divide-y divide-gray-200 bg-white "
	>
		<div class="h-0 flex-1 overflow-y-auto">
			<div class="flex flex-col justify-between">
				<div class="divide-y divide-gray-200 px-4 sm:px-6">
					<h1 class="text-2xl font-medium">
						{getTitle()}
					</h1>
					<div class="space-y-6 pt-6 pb-5">
						{#each Object.entries(formData) as [name, value] (name)}
							<TWInput
								{name}
								{value}
								invalid={!isEmpty($errors[name])}
								invalidText={$errors[name] ? flattenIfArray($errors[name]) : ''}
							/>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-shrink-0 justify-end px-4 py-4">
			<slot name="deleteButton" id={formData.id} />
			<button
				type="button"
				class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>
				Cancel
			</button>
			<button
				type="submit"
				disabled={!noErrorMsg || $isSubmitting}
				class="submit-button"
			>
				<svg
					class:hidden={!$isSubmitting}
					class="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
				Save
			</button>
		</div>
	</form>
</div>

<style lang="postcss">
	.submit-button {
		@apply ml-4 inline-flex w-1/5 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
		@apply disabled:cursor-not-allowed disabled:opacity-50;
	}
</style>
