import { api } from '$lib/client/api';
import { flatten } from '$lib/utils/flatten';
import type { RequestHandler } from '@sveltejs/kit';
import * as Papa from 'papaparse';

export const GET: RequestHandler = async ({ params, locals }) => {
	const expenses = await api({
		token: locals.accessToken!,
		roleId: locals.xRoleId,
	}).expenses.findAll({
		take: 999999999,
		portfolioId: params.id,
	});

	const flat = expenses.results.map((e) => flatten(e));
	const csv = Papa.unparse(flat);

	return new Response(csv, {
		headers: {
			'Content-Disposition': 'attachment; filename="expenses.csv"',
			'Content-Type': 'text/csv',
		},
	});
};
