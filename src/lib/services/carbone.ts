import type { InferQueryOutput } from '$lib/client/trpc';
import { concatIfExists } from '$lib/utils/table-utils';
import { Tafgeet } from '$lib/utils/currency';
import { entityDefinitions } from '$lib/definitions';

type Lease = NonNullable<InferQueryOutput<'leases:read'>>;
export const renderReportAndGetRenderId = async (
	lease: Lease,
): Promise<string> => {
	try {
		console.log({ lease }, 'carbone.ts ~ 11');
		const body = {
			convertTo: 'pdf', // Convert the template to another file format
			data: {
				date: new Date().toISOString().slice(0, 10),
				tenant_name: concatIfExists([
					lease.tenant?.firstName,
					lease.tenant?.secondName,
					lease.tenant?.thirdName,
					lease.tenant?.lastName,
				]),
				civilid: lease.tenant?.civilid,
				phone: lease.tenant?.phone,
				nationality: 'TODO nationality',
				unittype: lease.unit?.type,
				unit_number: lease.unit?.unitNumber,
				property_address: lease.unit?.property
					? entityDefinitions.properties.label(lease.unit?.property)
					: '',
				rent_amount: lease.monthlyRent.toLocaleString('en-KW', {
					minimumFractionDigits: 3,
				}),
				rent_amount_words: inWords(lease.monthlyRent),
				contract_start: lease.startDate.toISOString().slice(0, 10),
			},
		};
		console.info(body.data, 'carbone.ts ~ 30');
		const templateId =
			'3e33b33d59b8d2406e5db888905bb02efdc4356160871899ff1e83c8c9345119'; // special template id for demo purpose
		const res = await fetch(`https://render.carbone.io/render/${templateId}`, {
			method: 'POST',
			headers: new Headers({
				Authorization:
					'Bearer test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0ODU0IiwiYXVkIjoiY2FyYm9uZSIsImV4cCI6MjI2Nzg0ODA1MCwiZGF0YSI6eyJpZEFjY291bnQiOjQ4NTR9fQ.ATbBrQGqusseBosgKB1iDs2Cfbcg78wYEGUCDPpoQfEKZoZuPHK-kRg9YkSLk8HDV9b6ej3bwuAT23J-ElWbNJsVAWnMVqG5t-5R9MZuyn6zoLgR12ZHuC15gMgIooSJAVVHK473NeOQvodah1NMBKS81xGwpbUytBN05v2OPBAHbMr9',
				'Content-Type': 'application/json',
				'Carbone-Version': '3',
			}),
			body: JSON.stringify(body),
		});
		const data = await res.json();
		console.log({ data }, 'carbone.ts ~ 38');
		const pdfUrl = `https://render.carbone.io/render/${
			data.data?.renderId as string
		}`;
		console.log({ pdfUrl }, 'carbone.ts ~ 40');
		return pdfUrl;
	} catch (error) {
		console.error(error, 'carbone.ts ~ 44');
		throw error;
	}
};

export const inWords = (num: number): string => {
	let stringText: string = new (Tafgeet as any)(num, 'KWD').parse();
	return stringText;
};
