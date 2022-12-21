<script lang="ts">
	import { classes } from '$lib/utils/classes';

	export let value: number;
	export let size = 3;
	export let thickness = 0.22;
	export let extraClasses = '';
</script>

<!-- https://daisyui.com/components/radial-progress/ -->
<!-- https://github.com/saadeghi/daisyui/blob/master/src/components/unstyled/radial-progress.css -->
<!-- https://github.com/saadeghi/daisyui/blob/master/src/components/styled/radial-progress.css -->

<div
	class={classes('radial-progress', extraClasses)}
	style:--value={value}
	style:--size="{size}rem"
	style:--thickness="{thickness}rem"
>
	{value}%
</div>

<style lang="postcss">
	.radial-progress {
		--value: 0;
		--size: 5rem;
		--thickness: calc(var(--size) / 10);
	}
	.radial-progress:after {
		@apply bg-current;
	}

	.radial-progress {
		@apply relative inline-grid h-[var(--size)] w-[var(--size)] place-content-center rounded-full bg-transparent;
		vertical-align: middle;
		box-sizing: content-box;
	}
	.radial-progress::-moz-progress-bar {
		@apply appearance-none bg-transparent;
	}
	.radial-progress::-webkit-progress-value {
		@apply appearance-none bg-transparent;
	}
	.radial-progress::-webkit-progress-bar {
		@apply appearance-none bg-transparent;
	}
	.radial-progress:before,
	.radial-progress:after {
		@apply absolute rounded-full;
		content: '';
	}
	.radial-progress:before {
		@apply inset-0;
		background: radial-gradient(farthest-side, currentColor 98%, #0000)
				top/var(--thickness) var(--thickness) no-repeat,
			conic-gradient(currentColor calc(var(--value) * 1%), #0000 0);
		-webkit-mask: radial-gradient(
			farthest-side,
			#0000 calc(99% - var(--thickness)),
			#000 calc(100% - var(--thickness))
		);
		mask: radial-gradient(
			farthest-side,
			#0000 calc(99% - var(--thickness)),
			#000 calc(100% - var(--thickness))
		);
	}
	.radial-progress:after {
		inset: calc(50% - var(--thickness) / 2);
		transform: rotate(calc(var(--value) * 3.6deg - 90deg))
			translate(calc(var(--size) / 2 - 50%));
	}
</style>
