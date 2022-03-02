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
		page.setFont(fontTajawal);
		const form = pdfDoc.getForm();

		// creates a right-aligned form field label and input
		function createFormField({
			label,
			value,
			y,
			font = fontTajawal,
		}: {
			label: string;
			value: string;
			y: number;
			font?: PDFFont;
		}): void {
			const x = 500;
			const fontSize = 16;

			// field label
			const labelWidth = font.widthOfTextAtSize(label, fontSize);
			page.drawText(label + ':', {
				x: x - labelWidth,
				y,
				size: fontSize,
				font,
			});

			// field input
			const field = form.createTextField(label);
			const inputWidth = 150;
			field.setText(value);
			field.addToPage(page, {
				x: x - inputWidth - labelWidth - 2,
				// x: x - inputWidth - 150,
				y: y - 4,
				font,
				borderWidth: 0,
				height: font.heightAtSize(fontSize + 2),
				width: inputWidth,
			});
			field.setAlignment(TextAlignment.Right);
			field.updateAppearances(fontTajawal);
		}

		createFormField({
			label: 'التاريخ',
			value: '2020-01-01',
			y: 700,
		});

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
			createFormField({
				label: field.arabic,
				value: field.arabic,
				y,
			});
		}

		// **Key Step:** Update the field appearances with the Tajawal font
		form.updateFieldAppearances(fontTajawal);
		// form.updateFieldAppearances(fontUbuntu);

		const viewerPrefs = pdfDoc.catalog.getOrCreateViewerPreferences();
		// viewerPrefs.setReadingDirection(ReadingDirection.R2L);
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
