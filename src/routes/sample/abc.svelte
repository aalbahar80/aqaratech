<script lang="ts">
	let num = 3;
	function counter(element: HTMLButtonElement, increment = 5) {
		let count = 0;
		updateText();

		function updateText() {
			element.innerHTML = count.toString();
		}

		element.addEventListener('click', () => {
			count += increment;
			updateText();
		});

		return {
			update(newIncrement) {
				console.log(newIncrement);
				increment = newIncrement;
			},
			destroy() {
				element.removeEventListener('click', () => {
					count += increment;
					updateText();
				});
			},
		};
	}
</script>

<h1>Some Heading</h1>
<h2 class="prose-xl">Some Heading</h2>
<p>{num}</p>

<!-- <button use:counter={num} on:click={() => num++} /> -->
<input type="number" bind:value={num} />
<button use:counter={num} />
<!-- <button use:counter /> -->
