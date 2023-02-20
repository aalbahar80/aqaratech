<script lang="ts">
	import Banner from '$lib/components/navbar/Banner.svelte';
</script>

<!-- FIX: refine props -->
<Banner
	message={`Your free trial will expire in ${20} days.`}
	buttonText="Manage Subscription"
/>
