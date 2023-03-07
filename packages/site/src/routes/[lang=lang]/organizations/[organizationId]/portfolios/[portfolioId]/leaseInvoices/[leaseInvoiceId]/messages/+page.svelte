<script lang="ts">
	import type { PageData } from './$types';

	import MessageTable from '$lib/components/message/MessageTable.svelte';

	export let data: PageData;
</script>

<MessageTable
	data={data.messages}
	invoice={data.leaseInvoice}
/>
