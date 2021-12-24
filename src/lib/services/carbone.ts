export async function renderReportAndGetRenderId() {
	const templateId =
		'3e33b33d59b8d2406e5db888905bb02efdc4356160871899ff1e83c8c9345119'; // special template id for demo purpose
	const resp = await fetch(`https://render.carbone.io/render/${templateId}`, {
		method: 'POST',
		headers: new Headers({
			Authorization:
				'Bearer test_eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI0ODU0IiwiYXVkIjoiY2FyYm9uZSIsImV4cCI6MjI2Nzg0ODA1MCwiZGF0YSI6eyJpZEFjY291bnQiOjQ4NTR9fQ.ATbBrQGqusseBosgKB1iDs2Cfbcg78wYEGUCDPpoQfEKZoZuPHK-kRg9YkSLk8HDV9b6ej3bwuAT23J-ElWbNJsVAWnMVqG5t-5R9MZuyn6zoLgR12ZHuC15gMgIooSJAVVHK473NeOQvodah1NMBKS81xGwpbUytBN05v2OPBAHbMr9',
			'Content-Type': 'application/json',
			'Carbone-Version': '3',
		}),
		body: JSON.stringify({
			convertTo: 'pdf', // Convert the template to another file format
			data: {
				// Update the data below and click on 'Render'
				id: 42,
				date: 1492012745,
				company: {
					name: 'myCompany',
					address: 'here',
					city: 'Notfar',
					postalCode: 123456,
				},
				customer: {
					name: 'myCustomer',
					address: 'there',
					city: 'Faraway',
					postalCode: 654321,
				},
				products: [
					{ name: 'product 1', priceUnit: 0.1, quantity: 10, priceTotal: 1 },
				],
				total: 140,
			},
		}),
	}).then((res) => res.json());
	if (resp && resp.success === true && resp.data && resp.data.renderId) {
		// Get the result with a simple HTTP GET
		const pdfUrl = `https://render.carbone.io/render/${resp.data.renderId}`;
		console.log(pdfUrl);
		return pdfUrl;
	} else if (resp && resp.error) {
		return resp.error;
	}
}
