export const PostUrl = (orgId: string) => {
	return {
		tenant: `/organizations/${orgId}/tenants`,
		portfolio: `/organizations/${orgId}/portfolios`,
		property: `/organizations/${orgId}/properties`,
		lease: `/organizations/${orgId}/leases`,
		invoice: `/organizations/${orgId}/leaseInvoices`,
		expense: `/organizations/${orgId}/expenses`,
		file: `/organizations/${orgId}/files`,
	};
};
