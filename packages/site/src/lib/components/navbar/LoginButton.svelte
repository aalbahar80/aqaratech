<script lang="ts">
	// eslint-disable-next-line import/no-named-as-default
	import LL from '$i18n/i18n-svelte';
	import TextButton from '$lib/components/buttons/TextButton.svelte';
	import { LOGIN } from '$lib/constants/routes';
</script>

<TextButton>
	<a href={LOGIN} rel="external" data-sveltekit-reload class="font-semibold">
		{$LL.buttons.login()}
	</a>
</TextButton>
