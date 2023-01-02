import { landing } from './landing';
import { secondaryFeatures } from './secondary-features';

import type { BaseTranslation } from '../i18n-types';

const ar: BaseTranslation = {
	HI: 'مرحبا {name:string}! يرجى ترك نجمة إذا كنت تحب هذا المشروع:',
	log: `هذا السجل تم استدعاؤه من '{fileName:string}'`,
	buttons: {
		login: 'تسجيل الدخول',
		contact: 'اتصل بنا',
	},
	landing,
	secondaryFeatures,
};

export default ar;
