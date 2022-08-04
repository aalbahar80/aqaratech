<script lang="ts">
	// TODO rm prod
	import { browser, dev, prerendering } from '$app/env';
	import { assets, base } from '$app/paths';
	import { navigating, page, session, updated } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import {
		PUBLIC_API_URL,
		PUBLIC_API_URL_LOCAL,
		PUBLIC_SITE_URL,
	} from '$env/static/public';

	export let processEnv: Record<string, any>;
	export let environment: Record<string, any>;

	const appEnv = { browser, dev, prerendering };
	const appStores = {
		updated: $updated,
		navigating: $navigating,
		page: $page,
		session: $session,
	};
	$: console.log({ url: $page.url });
</script>

<div class="prose">
	<pre>{JSON.stringify(env, null, 2)}</pre>
	<h3>PUBLIC_SITE_URL</h3>
	<pre>{JSON.stringify(PUBLIC_SITE_URL, null, 2)}</pre>
	<h3>PUBLIC_API_URL</h3>
	<pre>{JSON.stringify(PUBLIC_API_URL, null, 2)}</pre>
	<h3>PUBLIC_API_URL_LOCAL</h3>
	<pre>{JSON.stringify(PUBLIC_API_URL_LOCAL, null, 2)}</pre>
	<h3>importmetaenv</h3>
	<pre>{JSON.stringify(import.meta.env, null, 2)}</pre>
	<h3>import.meta.url</h3>
	<pre>{JSON.stringify(import.meta.url, null, 2)}</pre>
	<h3>import.meta</h3>
	<pre>{JSON.stringify(import.meta, null, 2)}</pre>
	<h3>$app/env</h3>
	<pre>{JSON.stringify(appEnv, null, 2)}</pre>
	<h3>User</h3>
	<pre>{JSON.stringify($session.user, null, 2)}</pre>
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
