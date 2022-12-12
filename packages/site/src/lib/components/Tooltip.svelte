<script lang="ts">
	import 'tippy.js/dist/tippy.css';

	import { tippyHint } from '$lib/actions/tippy';

	import Fa6SolidCircleInfo from '~icons/fa6-solid/circle-info';

	export let text = '';
</script>

<div use:tippyHint={{ content: text }}>
	<Fa6SolidCircleInfo class="h-4 w-4 flex-shrink-0 text-gray-400" />
</div>
