import { apiURL } from '../tests/api/fixtures/api-url';

/* eslint-disable @typescript-eslint/restrict-template-expressions */
export const PostUrl = (orgId: string) => {
	return {
		tenant: `${apiURL}/organizations/${orgId}/tenants`,
		portfolio: `${apiURL}/organizations/${orgId}/portfolios`,
		property: `${apiURL}/organizations/${orgId}/properties`,
		lease: `${apiURL}/organizations/${orgId}/leases`,
		invoice: `${apiURL}/organizations/${orgId}/leaseInvoices`,
		expense: `${apiURL}/organizations/${orgId}/expenses`,
		payout: `${apiURL}/organizations/${orgId}/payouts`,
		expenseCategory: `${apiURL}/organizations/${orgId}/expense-categories`,
		file: `${apiURL}/organizations/${orgId}/files`,
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
	ORGADMIN: `${apiURL}/organizations/${organizationId}/roles`,
	PORTFOLIO: portfolioId
		? `${apiURL}/organizations/${organizationId}/portfolios/${portfolioId}/roles`
		: '',
	TENANT: tenantId
		? `${apiURL}/organizations/${organizationId}/tenants/${tenantId}/roles`
		: '',
});

export const getUrl = ({
	organizationId,
	portfolioId,
	tenantId: _tenantId,
}: {
	organizationId?: string;
	portfolioId?: string | null;
	tenantId?: string | null;
}) => ({
	incomeAggregate: `${apiURL}/organizations/${organizationId}/portfolios/${portfolioId}/aggregate/income`,
	expensesAggregate: `${apiURL}/organizations/${organizationId}/portfolios/${portfolioId}/aggregate/expenses`,
});
