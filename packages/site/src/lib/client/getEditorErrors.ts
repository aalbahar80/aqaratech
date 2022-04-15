import type { AppRouter } from '$lib/server/trpc';
import type { TRPCClientError } from '@trpc/client';

export default function (error: TRPCClientError<AppRouter>) {
	console.log({ error }, 'getEditorErrors.ts ~ 5');
	// if (error.data?.code !== 'BAD_REQUEST') {
	// 	alert('Unknown error');
	// 	return;
	// }
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const errors: any = {};
	(JSON.parse(error.message) as { path: string[]; message: string }[]).forEach(
		(err) => {
			if (err.path[0]) {
				errors[err.path[0]] = [err.message];
			}
		},
	);
	return errors;
}
