<!-- <script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/api/prisma');
		const data = await res.json();
		return {
			props: { someTenants: data },
		};
	};
</script>

 <script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import PrismaClient from '$lib/config/prisma';
	import { browser } from '$app/env';
	export const load: Load = async () => {
		let someTenants;
		if (!browser) {
			const prisma = new PrismaClient({});
			someTenants = await prisma.tenants.findMany({
				take: 4,
				select: {
					id: true,
					first_name: true,
					phone: true,
				},
			});
			console.log(someTenants);
		}
		return {
			props: { someTenants },
		};
		// return {
		// props: { someTenants },
		// };
	};
</script> 

<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import { browser } from '$app/env';
	import { prisma } from '$lib/config/prisma';
	export const load: Load = async () => {
		if (!browser) {
			const someTenants = await prisma.tenants.findMany({
				take: 2,
				select: {
					id: true,
					first_name: true,
					phone: true,
				},
			});
			console.log(someTenants);
			return {
				props: { someTenants },
			};
		}
		return {};
	};
</script>

<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	import type { getAllTenants } from '$routes/api/prisma';
	export const load: Load = async ({ fetch }) => {
		const someTenants: Awaited<ReturnType<typeof getAllTenants>> = await fetch(
			'api/prisma',
		).then((res) => res.json());
		// const someTenants = await fetch('api/prisma').then((res) => res.json());
		// const res = await fetch('api/prisma');
		// const data = await res.json();

		return { props: { someTenants } };
	};
</script> -->
<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/prismatenants.json');

		if (res.ok) {
			const someTenants = await res.json();

			return {
				props: { someTenants },
			};
		}

		const { message } = await res.json();

		return {
			error: new Error(message),
		};
	};
</script>

<script lang="ts">
	export let someTenants;
</script>

<pre>{JSON.stringify(someTenants)}</pre>
<button on:click={() => console.log(someTenants)}> log it</button>
