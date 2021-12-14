<div
	class="w-full max-w-lg pb-4 mx-auto space-y-4 border border-gray-400 rounded-md shadow"
>
	<div class="flex flex-col justify-center h-12 px-4 bg-gray-100 rounded-md">
		<div
			class="flex flex-row content-center m-px space-x-4 place-content-between"
		>
			<div class="w-2/6 h-4 bg-gray-400 rounded" />
			<div class="w-1/6 h-4 bg-gray-400 rounded" />
			<div class="w-1/6 h-4 bg-gray-400 rounded" />
		</div>
	</div>
	{#each { length: 5 } as _, i}
		<div class="flex flex-col justify-center h-8 space-y-4">
			<div class="flex px-4 space-x-4 place-content-between animate-pulse">
				<div class="w-2/6 h-4 bg-gray-400 rounded" />
				<div class="w-1/6 h-4 bg-gray-400 rounded" />
				<div class="w-1/6 h-4 bg-gray-400 rounded" />
			</div>
		</div>
	{/each}
</div>
