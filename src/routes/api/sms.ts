export default {};
// import { logger } from '$lib/config/logger';
// import type { RequestHandler } from '@sveltejs/kit';

// // TODO protect this route
// export const get: RequestHandler = async (request) => {
// 	const id = request.url.searchParams.get('id');
// 	const phone = request.url.searchParams.get('phone');
// 	console.info('📜 sms.ts 6 phone:', phone);
// 	console.info('📜 sms.ts 7 id:', id);

// 	try {
// 		const base = 'https://sms-real-estate.vercel.app/api/send';

// 		const paymentUrl = `${import.meta.env.VITE_DOMAIN}/p/transactions/${id}`;
// 		console.info('📜 sms.ts 9 paymentUrl:', paymentUrl);

// 		const params = new URLSearchParams();
// 		params.set('phone', `+965${phone}`);
// 		params.set('paymentUrl', paymentUrl);

// 		const url = `${base}?${params.toString()}`;
// 		console.info('📜 sms.ts 17 url:', url);

// 		const res = await fetch(url);
// 		const data = await res.json();
// 		console.info('📜 index.svelte 69 data:', data);

// 		return {
// 			status: res.status,
// 			body: data,
// 		};
// 	} catch (err) {
// 		console.error(`📜 index.svelte 69 err:`, err);
// 		return {
// 			status: 500,
// 			body: 'Error sending SMS',
// 		};
// 	}
// };
