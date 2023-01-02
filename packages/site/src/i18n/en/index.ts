import { landing } from './landing';
import { secondaryFeatures } from './secondary-features';

import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	log: `This log was called from '{fileName:string}'`,
	buttons: {
		login: 'Log in',
		contact: 'Contact us',
		search: 'Search',
	},
	landing,
	secondaryFeatures,
};

export default en;
