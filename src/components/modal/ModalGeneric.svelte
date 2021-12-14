<script lang="ts">
	let isOpen = false;

	function openModal() {
		isOpen = true;
	}
	function closeModal() {
		isOpen = false;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />
<slot name="trigger" {openModal} />
{#if isOpen}
	<div class="modal modal-open">
		<div class="modal-box">
			<slot name="content" {closeModal} />
		</div>
	</div>
{/if}
