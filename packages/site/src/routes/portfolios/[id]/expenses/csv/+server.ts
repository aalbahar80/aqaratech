import { api } from '$api';
import { respondWithCsv } from '$lib/utils/respond-with-csv';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals }) => {
	const expenses = await api({
		token: locals.accessToken!,
		roleId: locals.xRoleId,
	}).expenses.findAll({
		take: 999999999,
		portfolioId: params.id,
	});

	return respondWithCsv(expenses.results, 'expenses');
};
