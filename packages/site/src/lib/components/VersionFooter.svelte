<script lang="ts">
	import { sentryConfig } from '$lib/environment/sentry.config';
</script>

<div class="text-[0.5rem] text-gray-600">
	v: {sentryConfig.release}
</div>
