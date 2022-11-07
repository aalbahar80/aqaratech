<script lang="ts">
	import DetailsPane from '$lib/components/DetailsPane.svelte';
	import { toUTCFormat } from '$lib/utils/common';
	import type { PageData } from './$types';

	export let data: PageData;

	$: details = [
		['Full Name', data.portfolio.fullName],
		['Label', data.portfolio.label],
		['Phone', data.portfolio.phone],
		['Civil ID', data.portfolio.civilid],
		[
			'Date of birth',
			data.portfolio.dob ? toUTCFormat(data.portfolio.dob) : null,
		],
	] as [string, string | null][];
</script>

<DetailsPane {details} />
