<!-- <script lang="ts" context="module">
	import { supabase } from '$lib/config/supabase';
	import type { definitions } from '$lib/types/supabase';
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async () => {
		const { data, error, status } = await supabase
			.from<definitions['leases']>('leases')
			// .select('id, start_date, tenants (email, first_name)')
			.select('id, start_date, tenant:tenant_id (email, first_name)')
			.limit(10);

		if (error) {
			console.error(error);
			return { error };
		}

		if (data)
			return {
				props: {
					leases: data,
				},
				maxage: 10,
			};
		return {};
	};
</script>

<script lang="ts">
	// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
	// type two = Awaited<ReturnType<typeof load>>;
	// type three = NonNullable<two['props']>['tenants'];
	// export let tenants: three;
	export let leases: definitions['leases'][];
	// export let tenants: typeof load;
	// export let tenants;
</script>

<!-- <pre>{JSON.stringify(tenants?.tenants[2].phone)}</pre>
<button on:click={() => console.log(tenants)}>Log data</button> -->

<!-- <pre>{JSON.stringify(tenants[2].first_name)}</pre> -->
<button on:click={() => console.log(leases)}>Log data</button>

<!-- {#each leases as { id, start_date }}
	<p>
		{id}
		{start_date}
	</p>
{/each} --> -->
