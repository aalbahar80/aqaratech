import { entity } from './entity';
import { landing } from './landing';

import type { BaseTranslation } from '../i18n-types';

const ar: BaseTranslation = {
	log: `هذا السجل تم استدعاؤه من '{fileName:string}'`,
	entity,
	buttons: {
		login: 'تسجيل الدخول',
		logout: 'تسجيل الخروج',
		contact: 'اتصل بنا',
		search: 'بحث',
	},
	nav: {
		financials: 'المالية',
		income: 'الدخل',
		charts: 'الرسوم البيانية',
		data: 'البيانات',
		occupancy: 'الاستغلال',
		list: 'القائمة',
		settings: 'الإعدادات',
		account: 'الحساب',
	},
	general: {
		name: 'اسم',
	},
	filter: {
		start: 'بداية',
		end: 'نهاية',
		range: 'نطاق',
	},
	landing,
};

export default ar;
