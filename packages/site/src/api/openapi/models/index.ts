/* tslint:disable */
/* eslint-disable */
/**
 *
 * @export
 * @interface ArrayOfExpenseDto
 */
export interface ArrayOfExpenseDto {
	/**
	 *
	 * @type {Array<ExpenseDto>}
	 * @memberof ArrayOfExpenseDto
	 */
	results?: Array<ExpenseDto>;
}
/**
 *
 * @export
 * @interface ArrayOfFileDto
 */
export interface ArrayOfFileDto {
	/**
	 *
	 * @type {Array<FileDto>}
	 * @memberof ArrayOfFileDto
	 */
	results?: Array<FileDto>;
}
/**
 *
 * @export
 * @interface ArrayOfLeaseDto
 */
export interface ArrayOfLeaseDto {
	/**
	 *
	 * @type {Array<LeaseDto>}
	 * @memberof ArrayOfLeaseDto
	 */
	results?: Array<LeaseDto>;
}
/**
 *
 * @export
 * @interface ArrayOfLeaseInvoiceDto
 */
export interface ArrayOfLeaseInvoiceDto {
	/**
	 *
	 * @type {Array<LeaseInvoiceDto>}
	 * @memberof ArrayOfLeaseInvoiceDto
	 */
	results?: Array<LeaseInvoiceDto>;
}
/**
 *
 * @export
 * @interface ArrayOfOrganizationDto
 */
export interface ArrayOfOrganizationDto {
	/**
	 *
	 * @type {Array<OrganizationDto>}
	 * @memberof ArrayOfOrganizationDto
	 */
	results?: Array<OrganizationDto>;
}
/**
 *
 * @export
 * @interface ArrayOfPayoutDto
 */
export interface ArrayOfPayoutDto {
	/**
	 *
	 * @type {Array<PayoutDto>}
	 * @memberof ArrayOfPayoutDto
	 */
	results?: Array<PayoutDto>;
}
/**
 *
 * @export
 * @interface ArrayOfPortfolioDto
 */
export interface ArrayOfPortfolioDto {
	/**
	 *
	 * @type {Array<PortfolioDto>}
	 * @memberof ArrayOfPortfolioDto
	 */
	results?: Array<PortfolioDto>;
}
/**
 *
 * @export
 * @interface ArrayOfPropertyDto
 */
export interface ArrayOfPropertyDto {
	/**
	 *
	 * @type {Array<PropertyDto>}
	 * @memberof ArrayOfPropertyDto
	 */
	results?: Array<PropertyDto>;
}
/**
 *
 * @export
 * @interface ArrayOfRoleDto
 */
export interface ArrayOfRoleDto {
	/**
	 *
	 * @type {Array<RoleDto>}
	 * @memberof ArrayOfRoleDto
	 */
	results?: Array<RoleDto>;
}
/**
 *
 * @export
 * @interface ArrayOfTenantDto
 */
export interface ArrayOfTenantDto {
	/**
	 *
	 * @type {Array<TenantDto>}
	 * @memberof ArrayOfTenantDto
	 */
	results?: Array<TenantDto>;
}
/**
 *
 * @export
 * @interface ArrayOfUnitDto
 */
export interface ArrayOfUnitDto {
	/**
	 *
	 * @type {Array<UnitDto>}
	 * @memberof ArrayOfUnitDto
	 */
	results?: Array<UnitDto>;
}
/**
 *
 * @export
 * @interface BalanceDto
 */
export interface BalanceDto {
	/**
	 *
	 * @type {number}
	 * @memberof BalanceDto
	 */
	expenses: number;
	/**
	 *
	 * @type {number}
	 * @memberof BalanceDto
	 */
	leaseInvoices: number;
	/**
	 *
	 * @type {number}
	 * @memberof BalanceDto
	 */
	payouts: number;
	/**
	 *
	 * @type {number}
	 * @memberof BalanceDto
	 */
	total: number;
}
/**
 *
 * @export
 * @interface BreadcrumbDto
 */
export interface BreadcrumbDto {
	/**
	 *
	 * @type {string}
	 * @memberof BreadcrumbDto
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof BreadcrumbDto
	 */
	label: string;
}
/**
 *
 * @export
 * @interface BreadcrumbsDto
 */
export interface BreadcrumbsDto {
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof BreadcrumbsDto
	 */
	readonly portfolio: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof BreadcrumbsDto
	 */
	readonly property: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof BreadcrumbsDto
	 */
	readonly unit: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof BreadcrumbsDto
	 */
	readonly lease: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof BreadcrumbsDto
	 */
	tenant: BreadcrumbDto;
}
/**
 *
 * @export
 * @interface CreateExpenseCategoryDto
 */
export interface CreateExpenseCategoryDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseCategoryDto
	 */
	labelEn: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseCategoryDto
	 */
	labelAr?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseCategoryDto
	 */
	description?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseCategoryDto
	 */
	parentId?: string | null;
	/**
	 *
	 * @type {boolean}
	 * @memberof CreateExpenseCategoryDto
	 */
	isGroup: boolean;
}
/**
 *
 * @export
 * @interface CreateExpenseDto
 */
export interface CreateExpenseDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseDto
	 */
	propertyId: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseDto
	 */
	unitId: string | null;
	/**
	 *
	 * @type {number}
	 * @memberof CreateExpenseDto
	 */
	amount: number;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseDto
	 */
	postAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseDto
	 */
	categoryId?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseDto
	 */
	memo?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateExpenseDto
	 */
	label?: string | null;
}
/**
 *
 * @export
 * @interface CreateLeaseDto
 */
export interface CreateLeaseDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseDto
	 */
	unitId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseDto
	 */
	tenantId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseDto
	 */
	start: string;
	/**
	 *
	 * @type {number}
	 * @memberof CreateLeaseDto
	 */
	monthlyRent: number;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseDto
	 */
	end: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof CreateLeaseDto
	 */
	notify: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof CreateLeaseDto
	 */
	canPay: boolean;
}
/**
 *
 * @export
 * @interface CreateLeaseInvoiceDto
 */
export interface CreateLeaseInvoiceDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseInvoiceDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseInvoiceDto
	 */
	leaseId: string;
	/**
	 *
	 * @type {number}
	 * @memberof CreateLeaseInvoiceDto
	 */
	amount: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof CreateLeaseInvoiceDto
	 */
	isPaid: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseInvoiceDto
	 */
	postAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseInvoiceDto
	 */
	dueAt?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseInvoiceDto
	 */
	paidAt?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateLeaseInvoiceDto
	 */
	memo?: string | null;
}
/**
 *
 * @export
 * @interface CreateManyLeaseInvoicesDto
 */
export interface CreateManyLeaseInvoicesDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateManyLeaseInvoicesDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {number}
	 * @memberof CreateManyLeaseInvoicesDto
	 */
	amount: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof CreateManyLeaseInvoicesDto
	 */
	isPaid: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof CreateManyLeaseInvoicesDto
	 */
	postAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateManyLeaseInvoicesDto
	 */
	dueAt?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateManyLeaseInvoicesDto
	 */
	paidAt?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateManyLeaseInvoicesDto
	 */
	memo?: string | null;
}
/**
 *
 * @export
 * @interface CreateOrganizationDto
 */
export interface CreateOrganizationDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateOrganizationDto
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateOrganizationDto
	 */
	label?: string | null;
}
/**
 *
 * @export
 * @interface CreatePayoutDto
 */
export interface CreatePayoutDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreatePayoutDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {number}
	 * @memberof CreatePayoutDto
	 */
	amount: number;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePayoutDto
	 */
	postAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePayoutDto
	 */
	memo?: string | null;
}
/**
 *
 * @export
 * @interface CreatePortfolioDto
 */
export interface CreatePortfolioDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreatePortfolioDto
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePortfolioDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePortfolioDto
	 */
	phone?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePortfolioDto
	 */
	civilid?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePortfolioDto
	 */
	dob?: string | null;
}
/**
 *
 * @export
 * @interface CreatePropertyDto
 */
export interface CreatePropertyDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	number: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	area: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	block: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	street: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	avenue?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	parcel?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreatePropertyDto
	 */
	paci?: string | null;
}
/**
 *
 * @export
 * @interface CreateRoleDto
 */
export interface CreateRoleDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateRoleDto
	 */
	email: string;
}
/**
 *
 * @export
 * @interface CreateTenantDto
 */
export interface CreateTenantDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	civilid?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	phone?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	dob?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	nationality?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	passportNum?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	residencyEnd?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateTenantDto
	 */
	residencyNum?: string | null;
}
/**
 *
 * @export
 * @interface CreateUnitDto
 */
export interface CreateUnitDto {
	/**
	 *
	 * @type {string}
	 * @memberof CreateUnitDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateUnitDto
	 */
	propertyId: string;
	/**
	 *
	 * @type {string}
	 * @memberof CreateUnitDto
	 */
	unitNumber: string;
	/**
	 *
	 * @type {number}
	 * @memberof CreateUnitDto
	 */
	marketRent?: number | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateUnitDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateUnitDto
	 */
	type?: string | null;
	/**
	 *
	 * @type {number}
	 * @memberof CreateUnitDto
	 */
	bed?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof CreateUnitDto
	 */
	bath?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof CreateUnitDto
	 */
	size?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof CreateUnitDto
	 */
	floor?: number | null;
	/**
	 *
	 * @type {string}
	 * @memberof CreateUnitDto
	 */
	usage?: string | null;
}
/**
 *
 * @export
 * @interface ExpenseBreadcrumbsDto
 */
export interface ExpenseBreadcrumbsDto {
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof ExpenseBreadcrumbsDto
	 */
	readonly portfolio: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof ExpenseBreadcrumbsDto
	 */
	readonly property?: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof ExpenseBreadcrumbsDto
	 */
	readonly unit?: BreadcrumbDto;
}
/**
 *
 * @export
 * @interface ExpenseCategoryDto
 */
export interface ExpenseCategoryDto {
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseCategoryDto
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseCategoryDto
	 */
	labelEn: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseCategoryDto
	 */
	labelAr?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseCategoryDto
	 */
	description?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseCategoryDto
	 */
	parentId?: string | null;
	/**
	 *
	 * @type {boolean}
	 * @memberof ExpenseCategoryDto
	 */
	isGroup: boolean;
}
/**
 *
 * @export
 * @interface ExpenseDto
 */
export interface ExpenseDto {
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	postAt: string;
	/**
	 *
	 * @type {ExpenseBreadcrumbsDto}
	 * @memberof ExpenseDto
	 */
	breadcrumbs: ExpenseBreadcrumbsDto;
	/**
	 *
	 * @type {ExpenseDtoExpenseType}
	 * @memberof ExpenseDto
	 */
	expenseType: ExpenseDtoExpenseType | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {number}
	 * @memberof ExpenseDto
	 */
	amount: number;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	memo: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	unitId: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	propertyId: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	maintenanceOrderId: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDto
	 */
	categoryId: string | null;
}
/**
 *
 * @export
 * @interface ExpenseDtoExpenseType
 */
export interface ExpenseDtoExpenseType {
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDtoExpenseType
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDtoExpenseType
	 */
	labelEn: string;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDtoExpenseType
	 */
	labelAr?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDtoExpenseType
	 */
	description?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ExpenseDtoExpenseType
	 */
	parentId?: string | null;
	/**
	 *
	 * @type {boolean}
	 * @memberof ExpenseDtoExpenseType
	 */
	isGroup: boolean;
}
/**
 *
 * @export
 * @interface FileDto
 */
export interface FileDto {
	/**
	 *
	 * @type {string}
	 * @memberof FileDto
	 */
	key: string;
	/**
	 *
	 * @type {number}
	 * @memberof FileDto
	 */
	size: number;
}

/**
 *
 * @export
 */
export const FileRelationKeyEnum = {
	Tenant: 'tenant',
	Portfolio: 'portfolio',
	Property: 'property',
	Unit: 'unit',
	Expense: 'expense',
	Lease: 'lease',
	LeaseInvoice: 'leaseInvoice',
	MaintenanceOrder: 'maintenanceOrder',
} as const;
export type FileRelationKeyEnum =
	typeof FileRelationKeyEnum[keyof typeof FileRelationKeyEnum];

/**
 *
 * @export
 * @interface GroupByCategoryDto
 */
export interface GroupByCategoryDto {
	/**
	 *
	 * @type {string}
	 * @memberof GroupByCategoryDto
	 */
	categoryId: string;
	/**
	 *
	 * @type {number}
	 * @memberof GroupByCategoryDto
	 */
	amount: number;
}
/**
 *
 * @export
 * @interface GroupByLocationDto
 */
export interface GroupByLocationDto {
	/**
	 *
	 * @type {string}
	 * @memberof GroupByLocationDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof GroupByLocationDto
	 */
	propertyId: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof GroupByLocationDto
	 */
	unitId: string | null;
	/**
	 *
	 * @type {number}
	 * @memberof GroupByLocationDto
	 */
	amount: number;
}
/**
 *
 * @export
 * @interface GroupByMonthDto
 */
export interface GroupByMonthDto {
	/**
	 *
	 * @type {string}
	 * @memberof GroupByMonthDto
	 */
	date: string;
	/**
	 *
	 * @type {number}
	 * @memberof GroupByMonthDto
	 */
	amount: number;
}
/**
 *
 * @export
 * @interface HitDto
 */
export interface HitDto {
	/**
	 *
	 * @type {string}
	 * @memberof HitDto
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof HitDto
	 */
	title?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof HitDto
	 */
	entity: string;
	/**
	 *
	 * @type {HitDtoFormatted}
	 * @memberof HitDto
	 */
	formatted: HitDtoFormatted;
}
/**
 *
 * @export
 * @interface HitDtoFormatted
 */
export interface HitDtoFormatted {
	/**
	 *
	 * @type {string}
	 * @memberof HitDtoFormatted
	 */
	title?: string | null;
}
/**
 *
 * @export
 * @interface IncomeByMonthDto
 */
export interface IncomeByMonthDto {
	/**
	 *
	 * @type {Array<GroupByMonthDto>}
	 * @memberof IncomeByMonthDto
	 */
	total: Array<GroupByMonthDto>;
	/**
	 *
	 * @type {Array<GroupByMonthDto>}
	 * @memberof IncomeByMonthDto
	 */
	paid: Array<GroupByMonthDto>;
	/**
	 *
	 * @type {Array<GroupByMonthDto>}
	 * @memberof IncomeByMonthDto
	 */
	unpaid: Array<GroupByMonthDto>;
}
/**
 *
 * @export
 * @interface LeaseBreadcrumbsDto
 */
export interface LeaseBreadcrumbsDto {
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseBreadcrumbsDto
	 */
	readonly portfolio: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseBreadcrumbsDto
	 */
	readonly property: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseBreadcrumbsDto
	 */
	readonly unit: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseBreadcrumbsDto
	 */
	tenant: BreadcrumbDto;
}
/**
 *
 * @export
 * @interface LeaseDto
 */
export interface LeaseDto {
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	start: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	end: string;
	/**
	 *
	 * @type {LeaseBreadcrumbsDto}
	 * @memberof LeaseDto
	 */
	breadcrumbs: LeaseBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	tenantId: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	unitId: string;
	/**
	 *
	 * @type {number}
	 * @memberof LeaseDto
	 */
	monthlyRent: number;
	/**
	 *
	 * @type {number}
	 * @memberof LeaseDto
	 */
	deposit: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof LeaseDto
	 */
	canPay: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof LeaseDto
	 */
	notify: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseDto
	 */
	license: string | null;
}
/**
 *
 * @export
 * @interface LeaseInvoiceBreadcrumbsDto
 */
export interface LeaseInvoiceBreadcrumbsDto {
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseInvoiceBreadcrumbsDto
	 */
	readonly portfolio: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseInvoiceBreadcrumbsDto
	 */
	readonly property: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseInvoiceBreadcrumbsDto
	 */
	readonly unit: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseInvoiceBreadcrumbsDto
	 */
	readonly lease: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof LeaseInvoiceBreadcrumbsDto
	 */
	tenant: BreadcrumbDto;
}
/**
 *
 * @export
 * @interface LeaseInvoiceDto
 */
export interface LeaseInvoiceDto {
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	postAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	dueAt: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	paidAt: string | null;
	/**
	 *
	 * @type {LeaseInvoiceBreadcrumbsDto}
	 * @memberof LeaseInvoiceDto
	 */
	breadcrumbs: LeaseInvoiceBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {number}
	 * @memberof LeaseInvoiceDto
	 */
	amount: number;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	leaseId: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof LeaseInvoiceDto
	 */
	isPaid: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	memo: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof LeaseInvoiceDto
	 */
	mfPaymentId: string | null;
}
/**
 *
 * @export
 * @interface Occupancy
 */
export interface Occupancy {
	/**
	 *
	 * @type {number}
	 * @memberof Occupancy
	 */
	date: number;
	/**
	 *
	 * @type {number}
	 * @memberof Occupancy
	 */
	occupiedPct: number;
}
/**
 *
 * @export
 * @interface OrganizationCreatedDto
 */
export interface OrganizationCreatedDto {
	/**
	 *
	 * @type {OrganizationDto}
	 * @memberof OrganizationCreatedDto
	 */
	organization: OrganizationDto;
	/**
	 *
	 * @type {string}
	 * @memberof OrganizationCreatedDto
	 */
	roleId: string;
}
/**
 *
 * @export
 * @interface OrganizationDto
 */
export interface OrganizationDto {
	/**
	 *
	 * @type {string}
	 * @memberof OrganizationDto
	 */
	title: string;
	/**
	 *
	 * @type {string}
	 * @memberof OrganizationDto
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof OrganizationDto
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof OrganizationDto
	 */
	label?: string | null;
}
/**
 *
 * @export
 * @interface PaginatedDto
 */
export interface PaginatedDto {
	/**
	 *
	 * @type {number}
	 * @memberof PaginatedDto
	 */
	page: number;
	/**
	 *
	 * @type {number}
	 * @memberof PaginatedDto
	 */
	take: number;
	/**
	 * Total number of items in the collection
	 * @type {number}
	 * @memberof PaginatedDto
	 */
	itemCount: number;
	/**
	 *
	 * @type {number}
	 * @memberof PaginatedDto
	 */
	pageCount: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof PaginatedDto
	 */
	hasPreviousPage: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof PaginatedDto
	 */
	hasNextPage: boolean;
	/**
	 *
	 * @type {number}
	 * @memberof PaginatedDto
	 */
	pageSize: number;
	/**
	 *
	 * @type {number}
	 * @memberof PaginatedDto
	 */
	start: number;
	/**
	 *
	 * @type {number}
	 * @memberof PaginatedDto
	 */
	end: number;
}
/**
 *
 * @export
 * @interface PaginatedExpenseDto
 */
export interface PaginatedExpenseDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedExpenseDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<ExpenseDto>}
	 * @memberof PaginatedExpenseDto
	 */
	results: Array<ExpenseDto>;
}
/**
 *
 * @export
 * @interface PaginatedFileDto
 */
export interface PaginatedFileDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedFileDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<FileDto>}
	 * @memberof PaginatedFileDto
	 */
	results: Array<FileDto>;
}
/**
 *
 * @export
 * @interface PaginatedLeaseDto
 */
export interface PaginatedLeaseDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedLeaseDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<LeaseDto>}
	 * @memberof PaginatedLeaseDto
	 */
	results: Array<LeaseDto>;
}
/**
 *
 * @export
 * @interface PaginatedLeaseInvoiceDto
 */
export interface PaginatedLeaseInvoiceDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedLeaseInvoiceDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<LeaseInvoiceDto>}
	 * @memberof PaginatedLeaseInvoiceDto
	 */
	results: Array<LeaseInvoiceDto>;
}
/**
 *
 * @export
 * @interface PaginatedMetaDto
 */
export interface PaginatedMetaDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedMetaDto
	 */
	pagination: PaginatedDto;
}
/**
 *
 * @export
 * @interface PaginatedOrganizationDto
 */
export interface PaginatedOrganizationDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedOrganizationDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<OrganizationDto>}
	 * @memberof PaginatedOrganizationDto
	 */
	results: Array<OrganizationDto>;
}
/**
 *
 * @export
 * @interface PaginatedPayoutDto
 */
export interface PaginatedPayoutDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedPayoutDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<PayoutDto>}
	 * @memberof PaginatedPayoutDto
	 */
	results: Array<PayoutDto>;
}
/**
 *
 * @export
 * @interface PaginatedPortfolioDto
 */
export interface PaginatedPortfolioDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedPortfolioDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<PortfolioDto>}
	 * @memberof PaginatedPortfolioDto
	 */
	results: Array<PortfolioDto>;
}
/**
 *
 * @export
 * @interface PaginatedPropertyDto
 */
export interface PaginatedPropertyDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedPropertyDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<PropertyDto>}
	 * @memberof PaginatedPropertyDto
	 */
	results: Array<PropertyDto>;
}
/**
 *
 * @export
 * @interface PaginatedRoleDto
 */
export interface PaginatedRoleDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedRoleDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<RoleDto>}
	 * @memberof PaginatedRoleDto
	 */
	results: Array<RoleDto>;
}
/**
 *
 * @export
 * @interface PaginatedTenantDto
 */
export interface PaginatedTenantDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedTenantDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<TenantDto>}
	 * @memberof PaginatedTenantDto
	 */
	results: Array<TenantDto>;
}
/**
 *
 * @export
 * @interface PaginatedUnitDto
 */
export interface PaginatedUnitDto {
	/**
	 *
	 * @type {PaginatedDto}
	 * @memberof PaginatedUnitDto
	 */
	pagination: PaginatedDto;
	/**
	 *
	 * @type {Array<UnitDto>}
	 * @memberof PaginatedUnitDto
	 */
	results: Array<UnitDto>;
}
/**
 *
 * @export
 * @interface PartialExpenseDto
 */
export interface PartialExpenseDto {
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	readonly id?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	readonly createdAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	readonly updatedAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	postAt?: string;
	/**
	 *
	 * @type {ExpenseBreadcrumbsDto}
	 * @memberof PartialExpenseDto
	 */
	breadcrumbs?: ExpenseBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	organizationId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	portfolioId?: string;
	/**
	 *
	 * @type {number}
	 * @memberof PartialExpenseDto
	 */
	amount?: number;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	memo?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	unitId?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	propertyId?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	maintenanceOrderId?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialExpenseDto
	 */
	categoryId?: string | null;
	/**
	 *
	 * @type {ExpenseDtoExpenseType}
	 * @memberof PartialExpenseDto
	 */
	expenseType?: ExpenseDtoExpenseType | null;
}
/**
 *
 * @export
 * @interface PartialLeaseDto
 */
export interface PartialLeaseDto {
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	readonly id?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	readonly createdAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	readonly updatedAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	start?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	end?: string;
	/**
	 *
	 * @type {LeaseBreadcrumbsDto}
	 * @memberof PartialLeaseDto
	 */
	breadcrumbs?: LeaseBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	organizationId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	portfolioId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	tenantId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	unitId?: string;
	/**
	 *
	 * @type {number}
	 * @memberof PartialLeaseDto
	 */
	monthlyRent?: number;
	/**
	 *
	 * @type {number}
	 * @memberof PartialLeaseDto
	 */
	deposit?: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof PartialLeaseDto
	 */
	canPay?: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof PartialLeaseDto
	 */
	notify?: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseDto
	 */
	license?: string | null;
}
/**
 *
 * @export
 * @interface PartialLeaseInvoiceDto
 */
export interface PartialLeaseInvoiceDto {
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	readonly id?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	readonly createdAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	readonly updatedAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	postAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	dueAt?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	paidAt?: string | null;
	/**
	 *
	 * @type {LeaseInvoiceBreadcrumbsDto}
	 * @memberof PartialLeaseInvoiceDto
	 */
	breadcrumbs?: LeaseInvoiceBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	organizationId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	portfolioId?: string;
	/**
	 *
	 * @type {number}
	 * @memberof PartialLeaseInvoiceDto
	 */
	amount?: number;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	leaseId?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof PartialLeaseInvoiceDto
	 */
	isPaid?: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	memo?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialLeaseInvoiceDto
	 */
	mfPaymentId?: string | null;
}
/**
 *
 * @export
 * @interface PartialUnitDto
 */
export interface PartialUnitDto {
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	readonly id?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	readonly createdAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	readonly updatedAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	title?: string;
	/**
	 *
	 * @type {UnitVacancy}
	 * @memberof PartialUnitDto
	 */
	vacancy?: UnitVacancy;
	/**
	 *
	 * @type {UnitBreadcrumbsDto}
	 * @memberof PartialUnitDto
	 */
	breadcrumbs?: UnitBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	organizationId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	portfolioId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	propertyId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	unitNumber?: string;
	/**
	 *
	 * @type {number}
	 * @memberof PartialUnitDto
	 */
	floor?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof PartialUnitDto
	 */
	size?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof PartialUnitDto
	 */
	bed?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof PartialUnitDto
	 */
	bath?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof PartialUnitDto
	 */
	marketRent?: number | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	type?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	usage?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PartialUnitDto
	 */
	label?: string | null;
}
/**
 *
 * @export
 * @interface PayoutBreadcrumbsDto
 */
export interface PayoutBreadcrumbsDto {
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof PayoutBreadcrumbsDto
	 */
	readonly portfolio: BreadcrumbDto;
}
/**
 *
 * @export
 * @interface PayoutDto
 */
export interface PayoutDto {
	/**
	 *
	 * @type {string}
	 * @memberof PayoutDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof PayoutDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof PayoutDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof PayoutDto
	 */
	postAt: string;
	/**
	 *
	 * @type {PayoutBreadcrumbsDto}
	 * @memberof PayoutDto
	 */
	breadcrumbs: PayoutBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof PayoutDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof PayoutDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {number}
	 * @memberof PayoutDto
	 */
	amount: number;
	/**
	 *
	 * @type {string}
	 * @memberof PayoutDto
	 */
	memo?: string | null;
}
/**
 *
 * @export
 * @interface PortfolioDto
 */
export interface PortfolioDto {
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	dob: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	title: string;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	label: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	civilid: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PortfolioDto
	 */
	phone: string | null;
}
/**
 *
 * @export
 * @interface PropertyBreadcrumbsDto
 */
export interface PropertyBreadcrumbsDto {
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof PropertyBreadcrumbsDto
	 */
	readonly portfolio: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof PropertyBreadcrumbsDto
	 */
	readonly property: BreadcrumbDto;
}
/**
 *
 * @export
 * @interface PropertyDto
 */
export interface PropertyDto {
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	address: string;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	title: string;
	/**
	 *
	 * @type {PropertyBreadcrumbsDto}
	 * @memberof PropertyDto
	 */
	breadcrumbs: PropertyBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	area: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	block: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	avenue: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	street: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	number: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	parcel: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	paci: string | null;
	/**
	 *
	 * @type {number}
	 * @memberof PropertyDto
	 */
	cost: number | null;
	/**
	 *
	 * @type {string}
	 * @memberof PropertyDto
	 */
	label: string | null;
	/**
	 *
	 * @type {number}
	 * @memberof PropertyDto
	 */
	_long: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof PropertyDto
	 */
	lat: number | null;
}
/**
 *
 * @export
 * @interface RoleDto
 */
export interface RoleDto {
	/**
	 *
	 * @type {RoleTypeEnum}
	 * @memberof RoleDto
	 */
	roleType: RoleTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof RoleDto
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof RoleDto
	 */
	email: string;
	/**
	 *
	 * @type {string}
	 * @memberof RoleDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof RoleDto
	 */
	portfolioId: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof RoleDto
	 */
	tenantId: string | null;
}

/**
 *
 * @export
 */
export const RoleTypeEnum = {
	Orgadmin: 'ORGADMIN',
	Portfolio: 'PORTFOLIO',
	Tenant: 'TENANT',
} as const;
export type RoleTypeEnum = typeof RoleTypeEnum[keyof typeof RoleTypeEnum];

/**
 *
 * @export
 * @interface SearchDto
 */
export interface SearchDto {
	/**
	 *
	 * @type {string}
	 * @memberof SearchDto
	 */
	entityTitle: string;
	/**
	 *
	 * @type {Array<HitDto>}
	 * @memberof SearchDto
	 */
	hits: Array<HitDto>;
	/**
	 *
	 * @type {number}
	 * @memberof SearchDto
	 */
	offset: number;
	/**
	 *
	 * @type {number}
	 * @memberof SearchDto
	 */
	limit: number;
	/**
	 *
	 * @type {number}
	 * @memberof SearchDto
	 */
	processingTimeMs: number;
	/**
	 *
	 * @type {object}
	 * @memberof SearchDto
	 */
	facetDistribution?: object;
	/**
	 *
	 * @type {string}
	 * @memberof SearchDto
	 */
	query: string;
	/**
	 *
	 * @type {number}
	 * @memberof SearchDto
	 */
	estimatedTotalHits: number;
}
/**
 *
 * @export
 * @interface TenantDto
 */
export interface TenantDto {
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	dob: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	residencyEnd: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	title: string;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	label: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	civilid: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	phone: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	passportNum: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	nationality: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof TenantDto
	 */
	residencyNum: string | null;
}
/**
 *
 * @export
 * @interface UnitBreadcrumbsDto
 */
export interface UnitBreadcrumbsDto {
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof UnitBreadcrumbsDto
	 */
	readonly portfolio: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof UnitBreadcrumbsDto
	 */
	readonly property: BreadcrumbDto;
	/**
	 *
	 * @type {BreadcrumbDto}
	 * @memberof UnitBreadcrumbsDto
	 */
	readonly unit: BreadcrumbDto;
}
/**
 *
 * @export
 * @interface UnitDto
 */
export interface UnitDto {
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	title: string;
	/**
	 *
	 * @type {UnitVacancy}
	 * @memberof UnitDto
	 */
	vacancy: UnitVacancy;
	/**
	 *
	 * @type {UnitBreadcrumbsDto}
	 * @memberof UnitDto
	 */
	breadcrumbs: UnitBreadcrumbsDto;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	portfolioId: string;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	propertyId: string;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	unitNumber: string;
	/**
	 *
	 * @type {number}
	 * @memberof UnitDto
	 */
	floor: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof UnitDto
	 */
	size: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof UnitDto
	 */
	bed: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof UnitDto
	 */
	bath: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof UnitDto
	 */
	marketRent: number | null;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	type: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	usage: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UnitDto
	 */
	label: string | null;
}
/**
 *
 * @export
 * @interface UnitVacancy
 */
export interface UnitVacancy {
	/**
	 *
	 * @type {boolean}
	 * @memberof UnitVacancy
	 */
	isVacant: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof UnitVacancy
	 */
	vacancyDistance: string;
	/**
	 *
	 * @type {string}
	 * @memberof UnitVacancy
	 */
	vacancyDate: string;
}
/**
 *
 * @export
 * @interface UpdateExpenseCategoryDto
 */
export interface UpdateExpenseCategoryDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryDto
	 */
	labelEn: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryDto
	 */
	labelAr?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryDto
	 */
	description?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryDto
	 */
	parentId?: string | null;
}
/**
 *
 * @export
 * @interface UpdateExpenseCategoryTreeDto
 */
export interface UpdateExpenseCategoryTreeDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryTreeDto
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryTreeDto
	 */
	labelEn: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryTreeDto
	 */
	labelAr?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryTreeDto
	 */
	description?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseCategoryTreeDto
	 */
	parentId?: string | null;
}
/**
 *
 * @export
 * @interface UpdateExpenseDto
 */
export interface UpdateExpenseDto {
	/**
	 *
	 * @type {number}
	 * @memberof UpdateExpenseDto
	 */
	amount?: number;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseDto
	 */
	postAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseDto
	 */
	categoryId?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseDto
	 */
	memo?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateExpenseDto
	 */
	label?: string | null;
}
/**
 *
 * @export
 * @interface UpdateLeaseDto
 */
export interface UpdateLeaseDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdateLeaseDto
	 */
	start?: string;
	/**
	 *
	 * @type {number}
	 * @memberof UpdateLeaseDto
	 */
	monthlyRent?: number;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateLeaseDto
	 */
	end?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof UpdateLeaseDto
	 */
	notify?: boolean;
	/**
	 *
	 * @type {boolean}
	 * @memberof UpdateLeaseDto
	 */
	canPay?: boolean;
}
/**
 *
 * @export
 * @interface UpdateLeaseInvoiceDto
 */
export interface UpdateLeaseInvoiceDto {
	/**
	 *
	 * @type {number}
	 * @memberof UpdateLeaseInvoiceDto
	 */
	amount?: number;
	/**
	 *
	 * @type {boolean}
	 * @memberof UpdateLeaseInvoiceDto
	 */
	isPaid?: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateLeaseInvoiceDto
	 */
	postAt?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateLeaseInvoiceDto
	 */
	dueAt?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateLeaseInvoiceDto
	 */
	paidAt?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateLeaseInvoiceDto
	 */
	memo?: string | null;
}
/**
 *
 * @export
 * @interface UpdateOrganizationDto
 */
export interface UpdateOrganizationDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdateOrganizationDto
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateOrganizationDto
	 */
	label?: string | null;
}
/**
 *
 * @export
 * @interface UpdatePortfolioDto
 */
export interface UpdatePortfolioDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePortfolioDto
	 */
	fullName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePortfolioDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePortfolioDto
	 */
	phone?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePortfolioDto
	 */
	civilid?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePortfolioDto
	 */
	dob?: string | null;
}
/**
 *
 * @export
 * @interface UpdatePropertyDto
 */
export interface UpdatePropertyDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	number?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	area?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	block?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	street?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	avenue?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	parcel?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdatePropertyDto
	 */
	paci?: string | null;
}
/**
 *
 * @export
 * @interface UpdateTenantDto
 */
export interface UpdateTenantDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	fullName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	civilid?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	phone?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	dob?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	nationality?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	passportNum?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	residencyEnd?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateTenantDto
	 */
	residencyNum?: string | null;
}
/**
 *
 * @export
 * @interface UpdateUnitDto
 */
export interface UpdateUnitDto {
	/**
	 *
	 * @type {string}
	 * @memberof UpdateUnitDto
	 */
	unitNumber?: string;
	/**
	 *
	 * @type {number}
	 * @memberof UpdateUnitDto
	 */
	marketRent?: number | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateUnitDto
	 */
	label?: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateUnitDto
	 */
	type?: string | null;
	/**
	 *
	 * @type {number}
	 * @memberof UpdateUnitDto
	 */
	bed?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof UpdateUnitDto
	 */
	bath?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof UpdateUnitDto
	 */
	size?: number | null;
	/**
	 *
	 * @type {number}
	 * @memberof UpdateUnitDto
	 */
	floor?: number | null;
	/**
	 *
	 * @type {string}
	 * @memberof UpdateUnitDto
	 */
	usage?: string | null;
}
/**
 *
 * @export
 * @interface ValidatedRoleDto
 */
export interface ValidatedRoleDto {
	/**
	 *
	 * @type {RoleTypeEnum}
	 * @memberof ValidatedRoleDto
	 */
	roleType: RoleTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDto
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDto
	 */
	email: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDto
	 */
	organizationId: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDto
	 */
	portfolioId: string | null;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDto
	 */
	tenantId: string | null;
	/**
	 *
	 * @type {ValidatedRoleDtoAllOfOrganization}
	 * @memberof ValidatedRoleDto
	 */
	organization: ValidatedRoleDtoAllOfOrganization;
}
/**
 *
 * @export
 * @interface ValidatedRoleDtoAllOf
 */
export interface ValidatedRoleDtoAllOf {
	/**
	 *
	 * @type {ValidatedRoleDtoAllOfOrganization}
	 * @memberof ValidatedRoleDtoAllOf
	 */
	organization: ValidatedRoleDtoAllOfOrganization;
}
/**
 *
 * @export
 * @interface ValidatedRoleDtoAllOfOrganization
 */
export interface ValidatedRoleDtoAllOfOrganization {
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDtoAllOfOrganization
	 */
	id: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDtoAllOfOrganization
	 */
	fullName: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedRoleDtoAllOfOrganization
	 */
	title?: string;
}
/**
 *
 * @export
 * @interface ValidatedUserDto
 */
export interface ValidatedUserDto {
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedUserDto
	 */
	readonly id: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedUserDto
	 */
	readonly createdAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedUserDto
	 */
	readonly updatedAt: string;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedUserDto
	 */
	fullName?: string | null;
	/**
	 *
	 * @type {Array<ValidatedRoleDto>}
	 * @memberof ValidatedUserDto
	 */
	roles: Array<ValidatedRoleDto>;
	/**
	 *
	 * @type {string}
	 * @memberof ValidatedUserDto
	 */
	email: string;
}
