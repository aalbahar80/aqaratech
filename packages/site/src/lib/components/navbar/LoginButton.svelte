<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import { LOGIN } from '$lib/constants/routes';
</script>

<TextButton>
	<a href={LOGIN} rel="external" data-sveltekit-reload class="font-semibold">
		{$L.buttons.login()}
	</a>
</TextButton>
