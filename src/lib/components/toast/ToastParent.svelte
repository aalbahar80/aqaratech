<script lang="ts">
	import Toast from '$components/toast/Toast.svelte';
	import { dismissToast, toasts } from '$lib/stores/toast';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
</script>

{#if $toasts}
	<ul class="top-18 fixed right-4 z-50 flex flex-col items-end gap-y-4">
		{#each $toasts as { id, props } (id)}
			<li
				in:fly={{ duration: 300, y: -200 }}
				out:fly={{ duration: 100, x: 100 }}
				animate:flip={{ duration: 200 }}
			>
				<Toast {...props} close={() => dismissToast(id)} />
			</li>
		{/each}
	</ul>
{/if}
