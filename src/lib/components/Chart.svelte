<script lang="ts">
	export let src: string;
	export let titled: boolean = true;
	export let bordered: boolean = true;
	export let dark: boolean = false;

	const buildUrl = (url: string) => {
		if (bordered || titled || dark) {
			const borderHash = bordered ? 'bordered=true' : 'bordered=false';
			const titleHash = titled ? 'titled=true' : 'titled=false';
			const darkHash = dark ? 'theme=night' : '';
			return `${url}#${borderHash}&${titleHash}&${darkHash}`;
		}
		return src;
	};
	const resultUrl = buildUrl(src);
</script>

<iframe
	title={resultUrl}
	src={resultUrl}
	frameborder="0"
	class="h-[36rem] w-full p-4"
	allowtransparency
/>
