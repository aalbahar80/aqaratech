<script lang="ts">
	import L from '$i18n/i18n-svelte';
	import FilterRadio from '$lib/components/filter/FilterRadio.svelte';
</script>

<FilterRadio label={$L.buttons.options()}>
	<slot />
</FilterRadio>
