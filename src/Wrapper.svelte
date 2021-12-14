<!-- A way to wrap storybook components in global decorators-->
<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import client from './_client';
	import { setClient } from '@urql/svelte';
	setClient(client);
</script>

<!-- Order matters -->
<SvelteToast />
<slot />
