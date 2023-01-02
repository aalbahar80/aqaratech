import { entity } from './entity';
import { hero } from './hero';
import { landing } from './landing';
import { secondaryFeatures } from './secondary-features';

import type { BaseTranslation } from '../i18n-types';

const ar: BaseTranslation = {
	HI: 'مرحبا {name:string}! يرجى ترك نجمة إذا كنت تحب هذا المشروع:',
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
	filter: {
		start: 'بداية',
		end: 'نهاية',
		range: 'نطاق',
	},
	general: {
		name: 'اسم',
	},
	landing,
	hero,
	secondaryFeatures,
};

export default ar;
