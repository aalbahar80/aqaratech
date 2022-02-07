<script lang="ts">
	import startCase from 'lodash-es/startCase.js';

	export let name: string = '';
	export let value: string = '';
</script>

<div>
	<label for="project-name" class="block text-sm font-medium text-gray-900">
		{startCase(name)}
	</label>
	<div class="mt-1">
		<input
			type="text"
			{name}
			{value}
			id={name}
			class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
	</div>
</div>
