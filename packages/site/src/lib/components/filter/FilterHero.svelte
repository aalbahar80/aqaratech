<script lang="ts">
	export let title: string;
</script>

<div class="border-b border-gray-200 pb-2.5 pt-7 md:pb-5 md:pt-10">
	<h1 class="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
		<slot name="title">{title}</slot>
	</h1>
	<!-- <p class="mx-auto mt-4 max-w-3xl text-base text-gray-500"> -->
	<!-- 	<slot name="subtitle">{subtitle}</slot> -->
	<!-- </p> -->
</div>
