import * as pkg from '@cerbos/sdk';
const { Cerbos } = pkg;

export const cerbos = new Cerbos({
	hostname: 'http://localhost:3592',
	logLevel: 'debug',
});
