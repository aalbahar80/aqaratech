<li class="justify-between odd:bg-gray-50 even:bg-white">
	<a
		href="#1"
		class="flex items-center justify-between p-4 text-gray-500 hover:bg-gray-100 sm:px-6"
	>
		<dt class="text-sm font-medium">
			<slot name="label" />
		</dt>
		<dd class="text-sm font-medium tabular-nums">
			<slot name="definition" />
		</dd>
	</a>
</li>
