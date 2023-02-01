# Rent Payment Flow

1. Tenant wishes to pay invoice (id: 123)
2. Tenant makes request to `/leaseInvoices/123/pay`
3. Backend checks if invoice is eligible for payment
4. Backend makes request to MyFatoorah to create payment link. The request includes the `leaseInvoiceId`.

```json
{
	"CustomerReference": "123",
	"CallBackUrl": "/api/leaseInvoices/myfatoorah-callback"
}
```

5. MyFatoorah returns payment link
6. Tenant is redirected to payment link
7. Tenant makes payment
8. Tenant is redirected to `CallBackUrl` with `paymentId` in query params
9. Backend gets payment details from MyFatoorah using `paymentId`
10. If payment is successful, backend updates invoice status to `paid`
11. Tenant is redirected to invoice page `site/leaseInvoices/123`
