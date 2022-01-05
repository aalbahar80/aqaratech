<script lang="ts">
	import { ToastNotification } from 'carbon-components-svelte';
</script>

<ToastNotification
	timeout={20 * 1000}
	title="Error"
	subtitle="An internal server error occurred."
	caption={new Date().toLocaleString()}
/>
