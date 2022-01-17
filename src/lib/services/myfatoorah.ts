interface MFResponse {
    Data: {
        PaymentURL: string;
    }
};

export const getMFUrl = async (amount: number) => {
    const mfBaseUrl = import.meta.env.VITE_MYFATOORAH_BASE_URL;
    const mfToken = import.meta.env.VITE_MYFATOORAH_TOKEN;

    try {
        const res = await fetch(`${mfBaseUrl}/v2/ExecutePayment`, {
            headers: {
                Authorization: `Bearer ${mfToken}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                "InvoiceValue": amount, 
                "PaymentMethodId": 1, // KNET
            }),
        })
        const data = (await res.json()) as MFResponse;
        return data.Data.PaymentURL
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}