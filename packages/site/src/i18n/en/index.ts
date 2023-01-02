import { entity } from './entity';
import { landing } from './landing';
import { secondaryFeatures } from './secondary-features';

import type { BaseTranslation } from '../i18n-types';

const en: BaseTranslation = {
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	log: `This log was called from '{fileName:string}'`,
	entity,
	buttons: {
		login: 'Log in',
		logout: 'Log out',
		contact: 'Contact us',
		search: 'Search',
	},
	nav: {
		settings: 'Settings',
		account: 'Account',
	},
	landing,
	secondaryFeatures,
};

export default en;
