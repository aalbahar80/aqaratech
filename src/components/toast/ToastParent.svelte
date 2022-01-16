<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte';
	import { flip } from 'svelte/animate';
	import { toasts } from '$lib/stores/toast';
	import { fade } from 'svelte/transition';
</script>

{#if $toasts}
	<ul class="fixed right-0 top-12 z-50 flex flex-col items-end ">
		{#each $toasts as { id, props } (id)}
			<li transition:fade animate:flip={{ duration: 500 }}>
				<ToastNotification
					{...props}
					class="justify-self-center justify-items-end "
				/>
			</li>
		{/each}
	</ul>
{/if}
