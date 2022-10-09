<script lang="ts">
	import { sentryConfig } from '$lib/environment/sentry.config';
</script>

<div class="text-end text-xs text-gray-600">
	version: {sentryConfig.release}
</div>
