How would I go about getting typesafety between endpoint -> load -> component?

```ts
// countries.json.ts
const _get = () => {
	return prisma.country.findMany({
		take: 10,
		select: { id: true, capital: true },
	});
};

export const get: RequestHandler = async () => {
    const body = await _get();
    return {
        body,
    };
};

export type Body = Awaited<ReturnType<typeof _get>>; // this type exported

// countries.svelte
<script context="module" lang="ts">
	import type { Body } from './countries.json'; // and imported here
    import type { Load } from '@sveltejs/kit';
    export const load: Load = async ({ fetch }) => {
        const res = await fetch('/countries.json');
        const countries = ( await res.json() ) as Body; // which makes this typesafe
        return {
            props: countries,
        };
    };
</script>

<script lang="ts">
    export let countries: Body; // this is also typesafe
</script>
```
