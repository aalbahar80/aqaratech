<script lang="ts">
	export let title: string;
	export let subtitle = '';
</script>

<div class="flex flex-col gap-y-8 rounded-lg bg-white p-6 shadow">
	<div class="prose prose-base">
		<h3>{title}</h3>
		<p>{subtitle}</p>
	</div>
	<div class="py-2">
		<slot />
	</div>
</div>
