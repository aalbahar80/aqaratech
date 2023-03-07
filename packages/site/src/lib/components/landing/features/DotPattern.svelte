<script lang="ts">
	import clsx from 'clsx';

	export let patternId: string;
	export let cs: string;
</script>

<svg
	class={clsx('absolute transform lg:block', cs)}
	width={404}
	height={784}
	fill="none"
	viewBox="0 0 404 784"
	aria-hidden="true"
>
	<defs>
		<pattern
			id={patternId}
			x={0}
			y={0}
			width={20}
			height={20}
			patternUnits="userSpaceOnUse"
		>
			<rect
				x={0}
				y={0}
				width={4}
				height={4}
				class="text-gray-200"
				fill="currentColor"
			/>
		</pattern>
	</defs>
	<rect
		width={404}
		height={784}
		fill={`url(#${patternId})`}
	/>
</svg>
