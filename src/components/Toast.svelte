<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte';
</script>

<ToastNotification
	title="Error"
	subtitle="An internal server error occurred."
	caption={new Date().toLocaleString()}
/>
