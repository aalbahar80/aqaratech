import { Cerbos } from '@cerbos/sdk';

export const cerbos = new Cerbos({
	hostname: 'http://localhost:3592',
	// hostname: 'http://localhost:3500',
	logLevel: 'debug',
});
