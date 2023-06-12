<script lang="ts">
	import HeroiconsExclamationTriangle from '~icons/heroicons/exclamation-triangle';
	export let message: string;
</script>

<div class="border-s-4 border-yellow-400 bg-yellow-50 p-4 print:hidden">
	<div class="flex justify-center">
		<div class="flex-shrink-0">
			<HeroiconsExclamationTriangle
				class="h-5 w-5 text-yellow-400"
				aria-hidden="true"
			/>
		</div>
		<div class="ms-3 grow">
			<p class="text-sm text-yellow-700">
				{message}
			</p>
		</div>
	</div>
</div>
