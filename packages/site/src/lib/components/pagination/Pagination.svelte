<script lang="ts">
	import AnchorPagination from '$lib/components/pagination/AnchorPagination.svelte';
	import ButtonPagination from '$lib/components/pagination/ButtonPagination.svelte';
	import type { PaginatedDto } from '@self/sdk';

	export let pagination: PaginatedDto;
	export let useButtons = true;
</script>

{#if useButtons}
	<ButtonPagination {pagination} />
{:else}
	<AnchorPagination {pagination} />
{/if}
