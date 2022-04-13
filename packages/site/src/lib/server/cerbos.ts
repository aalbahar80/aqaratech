import { dev } from '$app/env';
import * as pkg from '@cerbos/sdk';
const { Cerbos } = pkg;

const hostname = dev ? 'http://localhost:3592' : 'https://cerbos.letand.be';
export const cerbos = new Cerbos({
	hostname,
	// logLevel: 'debug',
});
