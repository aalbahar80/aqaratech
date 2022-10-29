export const PostUrl = (orgId: string) => {
	return {
		tenant: `/organizations/${orgId}/tenants`,
		portfolio: `/organizations/${orgId}/portfolios`,
		property: `/organizations/${orgId}/properties`,
		lease: `/organizations/${orgId}/leases`,
		invoice: `/organizations/${orgId}/leaseInvoices`,
		expense: `/organizations/${orgId}/expenses`,
		payout: `/organizations/${orgId}/payouts`,
		expenseCategory: `/organizations/${orgId}/expense-categories`,
		file: `/organizations/${orgId}/files`,
	};
};

export const PostUrlRole = ({
	organizationId,
	portfolioId,
	tenantId,
}: {
	organizationId: string;
	portfolioId: string | null;
	tenantId: string | null;
}) => ({
	ORGADMIN: `/organizations/${organizationId}/roles`,
	PORTFOLIO: portfolioId
		? `/organizations/${organizationId}/portfolios/${portfolioId}/roles`
		: '',
	TENANT: tenantId
		? `/organizations/${organizationId}/tenants/${tenantId}/roles`
		: '',
});
