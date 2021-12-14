import { graphql } from 'msw';
import {
	InsertTenantMutationVariables,
	InsertTenantMutation,
	UpdateTenantMutation,
	UpdateTenantMutationVariables
} from '../src/generated/graphql';

export const myMocks = [
	graphql.mutation<InsertTenantMutation, InsertTenantMutationVariables>(
		'InsertTenant',
		(req, res, ctx) => {
			const { first_name } = req.variables;
			if (first_name === 'iwillfail') {
				return res(
					ctx.delay(800),
					ctx.status(403),
					ctx.errors([
						{
							message: 'Access denied'
						}
					])
				);
			}

			return res(
				ctx.data({
					insert_tenants_one: {
						id: 99,
						first_name: 'Alvaro',
						last_name: 'Recoba',
						email: 'alvaro@inter.com',
						phone: '98765432'
					}
				})
			);
		}
	),
	graphql.mutation<UpdateTenantMutation, UpdateTenantMutationVariables>(
		'UpdateTenant',
		(req, res, ctx) => {
			const { first_name } = req.variables._set;
			if (first_name === 'iwillfail') {
				return res(
					ctx.delay(800),
					ctx.status(403),
					ctx.errors([
						{
							message: 'Access denied'
						}
					])
				);
			}

			return res(
				ctx.data({
					update_tenants_by_pk: {
						id: 99,
						first_name: 'Diego',
						last_name: 'Maradona',
						email: 'alvaro@inter.com',
						phone: '98765432',
						dob: '1959-12-25',
						civilid: '123456789101',
						second_name: 'Armando'
					}
				})
			);
		}
	)
];
