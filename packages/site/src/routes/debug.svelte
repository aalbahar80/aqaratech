<script lang="ts">
	import { browser, dev, mode, prerendering, prod, server } from '$app/env';
	import { assets, base } from '$app/paths';
	import { navigating, page, session, updated } from '$app/stores';

	export let processEnv: Record<string, any>;
	export let environment: Record<string, any>;

	const appEnv = { browser, dev, mode, prerendering, prod, server };
	const appStores = {
		updated: $updated,
		navigating: $navigating,
		page: $page,
		session: $session,
	};
</script>

<div class="prose">
	<h3>importmetaenv</h3>
	<pre>{JSON.stringify(import.meta.env, null, 2)}</pre>
	<h3>import.meta.url</h3>
	<pre>{JSON.stringify(import.meta.url, null, 2)}</pre>
	<h3>import.meta</h3>
	<pre>{JSON.stringify(import.meta, null, 2)}</pre>
	<h3>$app/env</h3>
	<pre>{JSON.stringify(appEnv, null, 2)}</pre>
	<h3>environment config</h3>
	<pre>{JSON.stringify(environment, null, 2)}</pre>
	<h3>processEnv</h3>
	<pre>{JSON.stringify(processEnv, null, 2)}</pre>
	<h3>$app/stores</h3>
	<pre>{JSON.stringify(appStores, null, 2)}</pre>
	<h3>base</h3>
	<pre>{JSON.stringify(base, null, 2)}</pre>
	<h3>assets</h3>
	<pre>{JSON.stringify(assets, null, 2)}</pre>
</div>
