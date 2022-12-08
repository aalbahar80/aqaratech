<script lang="ts">
	export let patternId: string;
</script>

<svg
	class="absolute left-1/2 -translate-x-1/2 translate-y-16 transform lg:hidden"
	width={784}
	height={404}
	fill="none"
	viewBox="0 0 784 404"
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
	<rect width={784} height={404} fill={`url(#${patternId})`} />
</svg>
