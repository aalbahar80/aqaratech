import type { entity as en_entity } from '../en/entity';

export const entity = {
	organization: {
		plural: 'المؤسسات',
		singular: 'المؤسسة',
	},
	role: {
		plural: 'الأدوار',
		singular: 'الدور',
	},
	tenant: {
		plural: 'المستأجرين',
		singular: 'المستأجر',
	},
	portfolio: {
		plural: 'الملاك',
		singular: 'المالك',
	},
	property: {
		plural: 'العقارات',
		singular: 'العقار',
	},
	unit: {
		plural: 'الوحدات',
		singular: 'الوحدة',
	},
	lease: {
		plural: 'العقود',
		singular: 'العقد',
	},
	leaseInvoice: {
		plural: 'الفواتير',
		singular: 'الفاتورة',
	},
	maintenanceOrder: {
		plural: 'الصيانة',
		singular: 'الصيانة',
	},
	payout: {
		plural: 'المدفوعات',
		singular: 'المدفوعة',
	},
	expense: {
		plural: 'المصروفات',
		singular: 'المصروف',
	},
	expenseCategory: {
		plural: 'فئات المصروفات',
		singular: 'فئة المصروف',
	},
	file: {
		plural: 'الملفات',
		singular: 'الملف',
	},
} satisfies typeof en_entity;
