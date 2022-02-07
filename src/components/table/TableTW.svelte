<script lang="ts">
	export let rows: { id: string; [key: string]: unknown }[];
</script>

<div class="flex flex-col">
	<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
		<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
			<div
				class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
			>
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
							>
								Name
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
							>
								Title
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
							>
								Email
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
							>
								Role
							</th>
							<th scope="col" class="relative px-6 py-3">
								<span class="sr-only">Edit</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{#each rows as person, personIdx (person.id)}
							<tr class={personIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
								<td
									class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900"
									>{person.name}</td
								>
								<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
									>{person.title}</td
								>
								<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
									>{person.email}</td
								>
								<td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
									>{person.role}</td
								>
								<td
									class="whitespace-nowrap px-6 py-4 text-right text-sm font-medium"
								>
									<a
										use:initSlide
										href="#"
										class="text-indigo-600 hover:text-indigo-900"
									>
										Edit
									</a>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
