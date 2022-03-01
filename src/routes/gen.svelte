<script lang="ts">
	import fontkit from '@pdf-lib/fontkit';
	import {
		PDFDocument,
		ReadingDirection,
		TextAlignment,
		type PDFFont,
		type PDFPage,
		type PDFForm,
	} from 'pdf-lib';

	type Field = {
		arabic: string;
		english: string;
	};
	const fields: Record<string, Field> = {
		name: {
			arabic: 'الاسم',
			english: 'Name',
		},
		phone: {
			arabic: 'رقم الهاتف',
			english: 'Phone',
		},
		email: {
			arabic: 'البريد الالكتروني',
			english: 'Email',
		},
		address: {
			arabic: 'العنوان',
			english: 'Address',
		},
		nationality: {
			arabic: 'الجنسية',
			english: 'nationality',
		},
		'passport number': {
			arabic: 'رقم الجواز',
			english: 'passport number',
		},
		visa: {
			arabic: 'رقم الاقامة وتاريخها',
			english: 'visa',
		},
	};

	// creates a right-aligned form field label and input
	async function createFormField(
		label: string,
		value: string,
		y: number,
		font: PDFFont,
		page: PDFPage,
		form: PDFForm,
	) {
		const x = 500;
		const fontSize = 16;

		// field label
		const textWidth = font.widthOfTextAtSize(label, fontSize);
		page.drawText(label, {
			x: x - textWidth,
			y,
			size: fontSize,
			font,
		});

		// field input
		const fieldForm = form.createTextField(label);
		const width = 200;
		fieldForm.setText(value);
		fieldForm.addToPage(page, {
			x: x - width - 150,
			y,
			font,
			borderWidth: 0,
			height: font.heightAtSize(fontSize),
			width,
		});
		fieldForm.setAlignment(TextAlignment.Right);
		// fieldForm.updateAppearances(fontTajawal);
	}

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
		pdfDoc.setLanguage('ar-EG');

		// Embed the fonts
		pdfDoc.registerFontkit(fontkit);
		// const fontUbuntu = await pdfDoc.embedFont(fontBytesUbuntu);
		const fontTajawal = await pdfDoc.embedFont(fontBytesTajawal);
		// const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

		const page = pdfDoc.addPage([550, 750]);
		const form = pdfDoc.getForm();

		// date
		page.drawText('التاريخ', {
			x: 500 - fontTajawal.widthOfTextAtSize('التاريخ', 16),
			y: 700,
			size: 16,
			font: fontTajawal,
		});
		const dateField = form.createTextField('date');
		dateField.setText('2020-01-01');
		dateField.addToPage(page, {
			x: 500 - fontTajawal.widthOfTextAtSize('التاريخ', 16) - 150,
			y: 700,
			font: fontTajawal,
			borderWidth: 0,
			height: fontTajawal.heightAtSize(16),
			width: 100,
		});
		dateField.setAlignment(TextAlignment.Right);

		// title
		page.drawText('عقد ايجار', {
			x: 225,
			y: 650,
			size: 20,
			font: fontTajawal,
		});

		for (const [index, [key, field]] of Object.entries(
			Object.entries(fields),
		)) {
			const y = 600 - +index * 25;
			const x = 500;
			const fontSize = 16;
			const font = fontTajawal;

			// field label
			const textWidth = fontTajawal.widthOfTextAtSize(field.arabic, fontSize);
			page.drawText(field.arabic, {
				x: x - textWidth,
				y,
				size: fontSize,
				font,
			});

			// field input
			const fieldForm = form.createTextField(key);
			const width = 200;
			fieldForm.setText(field.arabic);
			fieldForm.addToPage(page, {
				x: x - width - 150,
				y,
				font,
				borderWidth: 0,
				height: fontTajawal.heightAtSize(fontSize),
				width,
			});
			fieldForm.setAlignment(TextAlignment.Right);
			// fieldForm.updateAppearances(fontTajawal);
		}

		// **Key Step:** Update the field appearances with the Tajawal font
		form.updateFieldAppearances(fontTajawal);
		// form.updateFieldAppearances(fontUbuntu);

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
