<div class="bg-white shadow sm:rounded-lg">
	<div class="px-4 py-5 sm:p-6">
		<div class="sm:flex sm:items-start sm:justify-between">
			<div>
				<h3 class="text-lg font-medium leading-6 text-gray-900">
					<slot name="title" />
				</h3>
				<div class="mt-2 max-w-xl text-sm text-gray-500">
					<slot name="content" />
				</div>
			</div>
			<div
				class="mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center"
			>
				<slot name="button" />
			</div>
		</div>
	</div>
</div>
