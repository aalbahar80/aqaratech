<script lang="ts">
	import { session } from '$app/stores';
</script>

<div class="mx-auto flex max-w-4xl flex-col space-y-6 p-4 sm:p-6 lg:p-8">
	<div class="prose">
		<h3>Authz</h3>
		<pre>{JSON.stringify($session.authz, null, 2)}</pre>
	</div>
</div>
