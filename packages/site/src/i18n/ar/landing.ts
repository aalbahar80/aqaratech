import { callToAction } from './cta';
import { features } from './features';
import { hero } from './hero';
import { secondaryFeatures } from './secondary-features';

import type { landing as en_landing } from '../en/landing';

export const landing = {
	hero,
	features,
	secondaryFeatures,
	callToAction,
} satisfies typeof en_landing;
