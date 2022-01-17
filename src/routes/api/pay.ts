import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
    const mfBaseUrl = import.meta.env.VITE_MYFATOORAH_BASE_URL;
    const mfToken = import.meta.env.VITE_MYFATOORAH_TOKEN;

    const res = await fetch(`${mfBaseUrl}/v2/ExecutePayment`, {
        headers: {
            Authorization: `Bearer ${mfToken}`,
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            "InvoiceValue": request.url.searchParams.get('amount'),
            "PaymentMethodId": 1, // KNET
        }),
    })

    const data = await res.json();
    return {
        status: 302,
        headers: {
            location: data.Data.PaymentURL,
        }
    }
}