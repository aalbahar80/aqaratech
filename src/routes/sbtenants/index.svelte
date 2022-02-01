<!-- <script lang="ts" context="module">
	import { supabase } from '$lib/config/supabase';
	import type { definitions } from '$lib/types/supabase';
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async () => {
		const { data, error, status } = await supabase
			.from<definitions['tenants']>('tenants')
			.select('first_name, id, last_name')
			.limit(10);

		if (data)
			return {
				props: {
					tenants: data,
				},
				maxage: 10,
			};
		return {};
	};
</script>

<script lang="ts">
	type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
	type two = Awaited<ReturnType<typeof load>>;
	type three = NonNullable<two['props']>['tenants'];
	// export let tenants: three;
	export let tenants: definitions['tenants'];
	// export let tenants: typeof load;
	// export let tenants;
</script> -->

<!-- <pre>{JSON.stringify(tenants?.tenants[2].phone)}</pre>
<button on:click={() => console.log(tenants)}>Log data</button> -->

<!-- <pre>{JSON.stringify(tenants[2].first_name)}</pre> -->
<!-- <button on:click={() => console.log(tenants)}>Log data</button>

{#each tenants as { first_name, phone }}
	<p>
		{first_name}
		{phone}
	</p>
{/each} -->
