<script lang="ts">
	import L from '$i18n/i18n-svelte';

	export let href: string;
</script>

<a
	{href}
	class="inline-block text-sm font-medium text-gray-700 hover:text-gray-900"
>
	<span aria-hidden="true"> + </span>
	{$L.buttons.new()}
</a>
