<script lang="ts">
	import { classes } from '$lib/utils';

	const transactions = [
		{
			id: 'AAPS0L',
			company: 'Chase & Co.',
			share: 'CAC',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
		// add more dummy data
		{
			id: 'MSFT0L',
			company: 'Microsoft',
			share: 'MSFT',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
		{
			id: 'AAPL0L',
			company: 'Apple',
			share: 'AAPL',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
		{
			id: 'GOOGL0L',
			company: 'Alphabet',
			share: 'GOOGL',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
		{
			id: 'FB0L',
			company: 'Facebook',
			share: 'FB',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
		{
			id: 'AMZN0L',
			company: 'Amazon',
			share: 'AMZN',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
		{
			id: 'INTC0L',
			company: 'Intel',
			share: 'INTC',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
		{
			id: 'NVDA0L',
			company: 'Nvidia',
			share: 'NVDA',
			commission: '+$4.37',
			price: '$3,509.00',
			quantity: '12.00',
			netAmount: '$4,397.00',
		},
	];

	interface RowHeader {
		key: string;
		title: string;
		// style: string;
		style: 'regular' | 'bold1' | 'bold2';
	}
	export let headers = [
		'Transaction ID',
		'Company',
		'Share',
		'Commision',
		'Price',
		'Quantity',
		'Net amount',
		'edit',
	];
	export let trxs = transactions;
	export let actionRow = true;
</script>

<div class="px-4 sm:px-6 lg:px-8">
	<div class="sm:flex sm:items-center">
		<div class="sm:flex-auto">
			<h1 class="text-xl font-semibold text-gray-900">Transactions</h1>
			<p class="mt-2 text-sm text-gray-700">
				A table of placeholder stock market data that does not make any sense.
			</p>
		</div>
		<div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
			<button
				type="button"
				class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
			>
				Export
			</button>
		</div>
	</div>
	<div class="mt-8 flex flex-col">
		<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div
					class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg"
				>
					<table class="min-w-full divide-y divide-gray-300">
						<thead class="bg-gray-50">
							<tr>
								{#each headers as header, idx (header)}
									{#if header === 'edit'}
										<th
											scope="col"
											class="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-6"
										>
											<span class="sr-only">Edit</span>
										</th>
									{:else}
										<th
											scope="col"
											class={classes(
												idx === 0 ? 'sm:pl-6 pl-4 pr-3' : 'px-2',
												'whitespace-nowrap py-3.5 text-left text-sm font-semibold text-gray-900',
											)}
										>
											{header}
										</th>
									{/if}
								{/each}
							</tr>
						</thead>
						<tbody class="divide-y divide-gray-200 bg-white">
							{#each transactions as transaction (transaction.id)}
								<tr>
									{#each headers as header, idx (header)}
										{#if header === 'edit'}
											<!-- <td class="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        class="text-sm font-medium text-gray-900 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-5"
                      >
                        <svg
                          class="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </td> -->
										{:else}
											<td
												class={classes(
													idx === 0 ? 'sm:pl-6 pl-4 pr-3' : 'px-2',
													'whitespace-nowrap py-2 text-sm text-gray-500',
												)}
												class:font-medium={bold1}
												class:text-gray-900={bold1 || bold2}
											>
												{transaction[header]}
											</td>
											<!-- <td
												class="px-6 py-4 whitespace-nowrap text-left text-sm leading-5 text-gray-500"
											>
												{transaction[header]}
											</td> -->
										{/if}
									{/each}

									<td
										class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
									>
										{transaction.id}
									</td>
									<td
										class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900"
									>
										{transaction.company}
									</td>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-900"
										>{transaction.share}</td
									>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
										>{transaction.commission}</td
									>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
										>{transaction.price}</td
									>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
										>{transaction.quantity}</td
									>
									<td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
										>{transaction.netAmount}</td
									>
									<td
										class="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6"
									>
										<a href="#" class="text-indigo-600 hover:text-indigo-900">
											Edit<span class="sr-only">, {transaction.id}</span>
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
</div>
