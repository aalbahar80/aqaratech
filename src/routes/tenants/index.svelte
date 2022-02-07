<script context="module" lang="ts">
	import type { Tenant, Prisma } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ props }) => ({
		props,
	});
</script>

<script lang="ts">
	import SlideOver from '$components/form/SlideOver.svelte';

	export let rows: Tenant[];

	let isOpen = false;
	let formData: Tenant;
	const newTenant: Prisma.TenantCreateInput = {
		civilid: '',
		firstName: '',
		lastName: '',
		email: 'dkf',
		phone: '',
		dob: undefined,
	};

	function initSlide(node: HTMLElement, tenant: any) {
		function handleClick() {
			isOpen = true;
			formData = tenant;
		}
		node.addEventListener('click', handleClick);
		return {
			destroy() {
				node.removeEventListener('click', handleClick);
			},
		};
	}
</script>

<SlideOver bind:isOpen {formData} />

<button use:initSlide={newTenant} class="row__edit-button"> New Inner </button>

{#each rows as tenant (tenant.id)}
	<div class="grid grid-flow-col">
		<button use:initSlide={tenant} class="row__edit-button">edit</button>
	</div>
{/each}

<style lang="postcss">
	.row__edit-button {
		@apply ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2;
	}
</style>
