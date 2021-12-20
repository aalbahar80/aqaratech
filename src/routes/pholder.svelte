<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		const todo = await res.json();
		return {
			props: {
				todo
			}
		};
	};
</script>

<script lang="ts">
	export let todo;
</script>

<p class="">{JSON.stringify(todo)}</p>
