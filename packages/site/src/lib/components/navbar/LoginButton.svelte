<script lang="ts">
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import { LOGIN } from '$lib/constants/routes';
</script>

<TextButton>
	<a href={LOGIN} rel="external" sveltekit:reload class="font-semibold">
		Log in
	</a>
</TextButton>
