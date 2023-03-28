<script lang="ts">
	import { ComboboxLabel } from '@rgossiaux/svelte-headlessui';
	import { createQuery } from '@tanstack/svelte-query';
	import debounce from 'just-debounce-it';

	import { page } from '$app/stores';

	import Combobox from '$lib/components/combobox/Combobox.svelte';
	import { getSearch } from '$lib/components/search/get-search';

	/** Extra classes to apply to the input */
	export let comboboxInputClass: string | undefined = undefined;
	/** Default label to display when no option is selected */
	export let defaultLabel = '';

	/** Changes in `_q` trigger a refetch. Useful for debouncing. */
	let _q = '';

	const refetch = debounce((q: string) => (_q = q), 300, true);

	// TODO:? prefetch on server
	$: query = createQuery({
		refetchOnMount: false, // Avoid fetch on each page load
		queryKey: ['search', _q, $page.data.user!.role!.organizationId],
		queryFn: async () =>
			await getSearch({
				query: _q,
				organizationId: $page.data.user!.role!.organizationId,
			}),
		select: (data) => data.portfolio,
		// enabled: !!_q || !!$query?.data,
	});
</script>

<Combobox
	options={$query.data ?? []}
	getLabel={(option) => option?.title ?? defaultLabel}
	getKey={(option) => option.id}
	{comboboxInputClass}
	on:filter={(e) => {
		refetch(e.detail);
	}}
	on:select
>
	<div slot="label">
		<ComboboxLabel class="sr-only">Portfolio</ComboboxLabel>
	</div>
</Combobox>
