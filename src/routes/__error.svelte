<script context="module" lang="ts">
	import type { ErrorLoad } from '@sveltejs/kit';

	export const load: ErrorLoad = ({ error, status }) => {
		return {
			props: {
				status,
				error,
			},
		};
	};
</script>

<script lang="ts">
	// your script goes here
	export let status: number;
	export let error: Error;
</script>

<h2>{error?.message}</h2>
<span class="FourOhFour-module--four-oh-four--aLt5V"> {status} </span>
<p>{JSON.stringify(error, null, 2)}</p>
<p>
	Go back to the <a href="/"> home page </a>.
</p>

<style global>
	.FourOhFour-module--four-oh-four--aLt5V {
		-webkit-text-fill-color: #0000;
		animation: FourOhFour-module--gradient--dIxR7 2s ease infinite;
		background: linear-gradient(35deg, #92eeee, #a66efa);
		-webkit-background-clip: text;
		background-size: 200% 200%;
		display: inline-block;
		/* font-size: 2.625rem; */
		font-size: 144px;
		font-weight: 600;
		letter-spacing: 0;
		line-height: 1.19;
		margin: 2.5rem 0 10rem;
	}
</style>
