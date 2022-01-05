<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	import { Button, Modal, ToastNotification } from 'carbon-components-svelte';
	import { TrashCan16, Edit16 } from 'carbon-icons-svelte';
	import { toast } from '@zerodevx/svelte-toast';
	import Toast from './Toast.svelte';
	import { addToast } from '$lib/stores/toast';

	let open = false;
</script>

<!-- <button on:click={() => toast.push('Hello world!')}>EMIT TOAST</button> -->

<button on:click={() => addToast()}>EMIT TOAST</button>

<button
	on:click={() =>
		toast.push({
			dismissable: false,
			// initial: 0,
			// next: 0,
			component: { src: Toast },
			theme: { '--toastBackground': 'clear', '--toastWidth': '100%' },
		})}>EMIT TOAST</button
>

<div class="grid grid-flow-col grid-rows-1 justify-end gap-4">
	<Button
		href={`${$page.url.pathname}/edit`}
		kind="tertiary"
		iconDescription="Edit"
		icon={Edit16}
	/>
	<Button
		kind="danger-tertiary"
		iconDescription="Delete"
		icon={TrashCan16}
		on:click={() => (open = true)}
	/>

	<Modal
		danger
		bind:open
		modalHeading="Are you sure?"
		primaryButtonText="Delete"
		secondaryButtonText="Cancel"
		on:click:button--secondary={() => (open = false)}
		on:open
		on:close
		on:submit={() => {
			console.log('🚀 ~ file: ActionPanel.svelte ~ line 36 ~ open', open);
			addToast();
			// open = false;
			// goto(`/${$page.url.pathname.split('/')[1]}`);
		}}
	>
		<p>This is a permanent action and cannot be undone.</p>
	</Modal>
</div>

<!-- <ToastNotification
	timeout={5}
	title="Error"
	subtitle="An internal server error occurred."
	caption={new Date().toLocaleString()}
/> -->
