<script context="module">
	export const prerender = true;

	/** @type {import("@sveltejs/kit").Load} */
	export function load() {
		return {
			status: 307,
			// redirect: '/docs/first-category/first-page'
			redirect: '/docs/user-management/types-of-users'
		};
	}
</script>
