<script lang="ts">
	import Toast from '$components/toast/Toast.svelte';
	import { toasts, dismissToast } from '$lib/stores/toast';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
</script>

{#if $toasts}
	<ul class="top-18 fixed right-4 z-50 flex flex-col items-end gap-y-4">
		{#each $toasts as { id, props } (id)}
			<li transition:fade animate:flip={{ duration: 500 }}>
				<Toast {...props} close={() => dismissToast(id)} />
			</li>
		{/each}
	</ul>
{/if}
