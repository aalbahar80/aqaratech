<script lang="ts">
	export let src: string;
	export let title: string = src;
	export let titled: boolean = true;
	export let bordered: boolean = true;
	export let dark: boolean = false;

	const resultUrl = `${src}#bordered=false&titled=true`;
</script>

<iframe
	src={resultUrl}
	title="dashboard"
	frameborder="0"
	class="h-[36rem] w-full p-4"
	allowtransparency
/>
