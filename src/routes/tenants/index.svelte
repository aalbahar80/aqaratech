<script context="module" lang="ts">
	import TablePrisma from '$components/table/TablePrisma.svelte';
	import type { Tenant, Prisma } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ props, url, params }) => {
		console.log(url);
		console.log(params);
		console.log('running load');
		// if (url.search) '';
		return {
			props,
		};
	};
</script>

<script lang="ts">
	import SlideOver from '$components/form/SlideOver.svelte';

	export let rows: Tenant[];
	export let totalItems: number;
	export let pageSize: number;

	let isOpen = false;
	const newTenant: Prisma.TenantCreateInput = {
		civilid: '',
		firstName: '',
		lastName: '',
		email: 'dkf',
		phone: '',
		dob: undefined,
	};
	let existingTenant: Tenant;

	const close = () => {
		isOpen = false;
		existingTenant = newTenant;
	};

	function initSlide(node: HTMLElement, tenantData: any) {
		function handleClick() {
			isOpen = true;
			existingTenant = tenantData;
		}
		node.addEventListener('click', handleClick);
		return {
			destroy() {
				console.log('destroy in action');
				node.removeEventListener('click', handleClick);
			},
		};
	}
</script>

<!-- <TablePrisma {rows} {totalItems} {pageSize} /> -->
<SlideOver
	bind:isOpen
	someData={existingTenant ?? newTenant}
	on:close={close}
/>

{#each rows as tenant (tenant.id)}
	<div class="grid grid-flow-col">
		<button
			use:initSlide={tenant}
			class="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
			>edit</button
		>
	</div>
{/each}
