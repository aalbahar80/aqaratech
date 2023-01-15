<script lang="ts">
	import { sentryConfig } from '$lib/environment/sentry.config';
</script>

<div class="text-end text-xs text-gray-600 print:hidden">
	version: {sentryConfig.release}
</div>
