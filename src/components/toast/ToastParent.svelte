<script lang="ts">
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
					class="justify-items-end justify-self-center "
				/>
			</li>
		{/each}
	</ul>
{/if}
