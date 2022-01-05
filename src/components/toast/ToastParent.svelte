<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte';
	import { flip } from 'svelte/animate';
	import { toasts } from '$lib/stores/toast';
	import { fly, slide, fade } from 'svelte/transition';
</script>

{#if $toasts}
	<ul class="fixed right-10 z-50 flex flex-col items-end ">
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

<!-- <style lang="postcss">
	section {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		width: 100%;
		display: flex;
		margin-top: 1rem;
		justify-content: center;
		flex-direction: column;
		z-index: 1000;
	}
</style> -->
