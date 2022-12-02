<script lang="ts">
	import Select from '$lib/components/form/inputs/Select.svelte';
	import TrxList from '$lib/components/trx/TrxList.svelte';
	import { toUTCFormat } from '@self/utils';
	import type { PageData } from './$types';

	export let data: PageData;
</script>
