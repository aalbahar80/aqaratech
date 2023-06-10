<script lang="ts">
	import DetailsPaneItem from '$lib/components/details-pane/DetailsPaneItem.svelte';

	type Details = $$Generic<Record<unknown, unknown>>;
	type TKeysLiteral = $$Generic<keyof Details>;
	type TFieldLabels = $$Generic<Record<TKeysLiteral, string>>;
	type Keys = Readonly<Exclude<TKeysLiteral, number | symbol>[]>;

	export let details: Details;
	export let keys: Keys = Object.keys(details) as unknown as Keys;

	/** Allows overriding the default labels for the keys.
	 * @example
	 * ```typescript
	 * { id: 'Invoice ID' }
	 * ```
	 */
	export let fieldLabels: Partial<TFieldLabels> = {};
</script>

<div data-testid="details-pane">
	<dl
		class="rounded-lg shadow print:border-2 print:border-gray-200 print:shadow-none"
	>
		{#each keys as key}
			<DetailsPaneItem
				{key}
				label={fieldLabels[key]}
				value={details[key]}
			/>
		{/each}
	</dl>
</div>
