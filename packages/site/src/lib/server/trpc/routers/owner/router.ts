import { charts } from './charts';
import { createRouter } from './createRouter';
import { properties } from './properties';
import { units } from './units';

export const ownerRouter = createRouter()
	.merge('properties:', properties)
	.merge('units:', units)
	.merge('charts:', charts);
