import { environment } from '$lib/environment';

const {
	mailConfig: { POSTMARK_TOKEN },
} = environment;

interface EmailModel {
	email: string;
	name: string;
	amount: string;
	date: string;
	trxUrl: string;
}

export async function sendEmail(info: EmailModel) {
	// TODO: handle res.ok/notok
	const { email, name, amount, date, trxUrl } = info;
	const res = await fetch('https://api.postmarkapp.com/email/withTemplate', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			'X-Postmark-Server-Token': POSTMARK_TOKEN,
		},
		body: JSON.stringify({
			From: 'Aqaratech <notifications@aqaratech.com>',
			To: info.email,
			TemplateAlias: 'invoice',
			TemplateModel: {
				email,
				amount,
				date,
				name,
				trxUrl,
			} as EmailModel,
		}),
	});
	const data = await res.json();
	console.log(data);
	if (data.Message === 'OK') {
		return {
			success: true,
			data,
		};
	} else {
		return {
			success: false, // true here refers to fetch not throwing, still need to handle status >= 400
			data,
			errorMsg: 'Failed to send email',
		};
	}
}
