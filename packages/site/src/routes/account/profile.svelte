<script lang="ts">
	import { session } from '$app/stores';
</script>

<div class="prose">
	<h3>User</h3>
	<pre>{JSON.stringify($session.user, null, 2)}</pre>
</div>
