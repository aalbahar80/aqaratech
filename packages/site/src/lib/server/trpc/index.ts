export {
	createContext,
	createRouter,
	responseMeta,
	isAdmin,
	isOwner,
} from './config'; // has to be first
export type { Context } from './config';
export { createTRPCHandle } from './handler';
export { router } from './router';
export type { Router } from './router';
