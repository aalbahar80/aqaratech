<script lang="ts">
	import '../styles/tailwind-output.css';
	import Wrapper from '../Wrapper.svelte';
	import Header from '$components/Header.svelte';
	import { onDestroy } from 'svelte';

	onDestroy(() => {
		console.log('destroyed layout');
	});
</script>

<Wrapper>
	<div class="absolute inset-0">
		<div class="flex flex-col h-screen">
			<Header />
			<main class="contents">
				<slot />
			</main>
		</div>
	</div>
</Wrapper>
