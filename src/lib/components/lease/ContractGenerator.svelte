<script lang="ts">
	import { PDFDocument } from 'pdf-lib';

	async function createForm() {
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([550, 750]);
		const form = pdfDoc.getForm();
		page.drawText('Hello World!', {
			x: 100,
			y: 700,
			size: 32,
		});

		// save the form
		const pdfBytes = await pdfDoc.save();
	}
</script>

<button onclick={createForm}>Create Form</button>
