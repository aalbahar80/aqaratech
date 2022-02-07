<script context="module" lang="ts">
	import SlideOver from '$components/form/SlideOver.svelte';
	import TableParent from '$components/table/TableParent.svelte';
	import { endpointBase, endpointPatch } from '$lib/config/constants';
	import type { Prisma, Tenant } from '@prisma/client';
</script>

<script lang="ts">
	import TableTW from './TableTW.svelte';

	export let rows: { id: string; [key: string]: unknown }[];

	let isOpen = false;
	let formData: Tenant;
	let action: string;
	let formType: string;

	const newTenant: Prisma.TenantCreateInput = {
		firstName: '',
		lastName: '',
		phone: '',
		email: '',
		// dob: '',
		civilid: '',
	};

	function initSlide(
		node: HTMLElement,
		{
			tenant,
			formAction,
			type,
		}: { tenant: Tenant; formAction: string; type: string },
	) {
		function handleClick() {
			isOpen = true;
			formData = tenant;
			action = formAction;
			formType = type;
		}
		node.addEventListener('click', handleClick);
		return {
			destroy() {
				node.removeEventListener('click', handleClick);
			},
		};
	}

	async function patch(res: Response) {
		const row = await res.json();

		rows = rows.map((t) => {
			if (t.id === row.id) return row;
			return t;
		});
	}
</script>

<TableTW {rows} />

<SlideOver bind:isOpen {formData} {action} {formType} />

<button
	use:initSlide={{
		tenant: newTenant,
		formAction: endpointBase('tenants'),
		type: 'create',
	}}
	class="row__edit-button"
>
	New Inner
</button>

{#each rows as tenant (tenant.id)}
	<div class="grid grid-flow-col">
		<button
			use:initSlide={{
				tenant,
				formAction: endpointPatch('tenants', tenant.id),
				type: 'update',
			}}
			class="row__edit-button">edit</button
		>
	</div>
{/each}

<TableParent {rows} />

<style lang="postcss">
	.row__edit-button {
		@apply ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
</style>
