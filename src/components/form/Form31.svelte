<script lang="ts">
	import { ValidationMessage } from '@felte/reporter-svelte';
	import type { Field } from './Field';
	import { Checkbox, TextInput } from 'carbon-components-svelte';

	export let fieldList: Field[];
</script>

<TextInput name="email" />
<slot />
{#each fieldList as { title, fieldName, inputType, editable, pattern, disabled }}
	{#if editable && fieldName !== 'tenant_did'}
		<ValidationMessage for={fieldName} let:messages={message}>
			{#if inputType === 'checkbox'}
				<Checkbox labelText={title} id={fieldName} name={fieldName} />
			{:else}
				<TextInput
					name={fieldName}
					id={fieldName}
					type={inputType}
					invalid={!!(message?.length ?? 0 > 0)}
					invalidText={message?.[0]}
					labelText={title}
					placeholder={title}
					size="xl"
					pattern={fieldName === 'civilid' ? '[0-9]*' : undefined}
					{disabled}
				/>
			{/if}
		</ValidationMessage>
	{/if}
{/each}
