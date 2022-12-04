<script lang="ts">
	export let title: string;
	export let subtitle = '';
</script>

<div class="pb-10 pt-20">
	<h1 class="text-4xl font-extrabold tracking-tight text-gray-900">
		<slot name="title">{title}</slot>
	</h1>
	<p class="mx-auto mt-4 max-w-3xl text-base text-gray-500">
		<slot name="subtitle">{subtitle}</slot>
	</p>
</div>
