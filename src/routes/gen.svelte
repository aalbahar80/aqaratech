<script lang="ts">
	import { PDFDocument, ReadingDirection } from 'pdf-lib';
	import fontkit from '@pdf-lib/fontkit';

	async function createForm() {
		// Fetch the Ubuntu font
		const urlUbuntu = 'https://pdf-lib.js.org/assets/ubuntu/Ubuntu-R.ttf';
		const urlTajawal = '/Tajawal-Regular.ttf';
		const fontBytesUbuntu = await fetch(urlUbuntu).then((res) =>
			res.arrayBuffer(),
		);
		const fontBytesTajawal = await fetch(urlTajawal).then((res) =>
			res.arrayBuffer(),
		);

		const pdfDoc = await PDFDocument.create();

		// Embed the fonts
		pdfDoc.registerFontkit(fontkit);
		// const ubuntuFont = await pdfDoc.embedFont(fontBytesUbuntu);
		const tajawalFont = await pdfDoc.embedFont(fontBytesTajawal);
		// const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

		// create form
		const page = pdfDoc.addPage([550, 750]);
		const form = pdfDoc.getForm();
		// page.drawText('Hello World!', {
		// 	x: 100,
		// 	y: 700,
		// 	size: 32,
		// 	// font: ubuntuFont,
		// });

		// const nameField = form.createTextField('name');
		// nameField.setText('John the machine Doe');
		// nameField.addToPage(page, {
		// 	x: 100,
		// 	y: 600,
		// 	// font: ubuntuFont,
		// 	font: tajawalFont,
		// });

		const areaField = form.createTextField('area');
		areaField.setText('الشامية');
		// areaField.setText('ية');
		// areaField.setText('Ӎӑȑїõ');
		areaField.addToPage(page, {
			x: 100,
			y: 500,
			font: tajawalFont,
			borderWidth: 0,
		});
		areaField.updateAppearances(tajawalFont);

		// **Key Step:** Update the field appearances with the Ubuntu font
		form.updateFieldAppearances(tajawalFont);
		// form.updateFieldAppearances(ubuntuFont);

		const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences();
		viewerPrefs.setReadingDirection(ReadingDirection.R2L);
		// save the form
		const pdfBytes = await pdfDoc.save();
		// download as blob
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const blobUrl = URL.createObjectURL(blob);
		window.open(blobUrl);
		// downloadBlob(blob, 'form.pdf');
	}
</script>

<button on:click={createForm} class="min-h-screen min-w-full bg-red-200"
	>Create Form</button
>
