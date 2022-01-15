// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { LeaseDetails } from './[id]/_index.gql';
export type LeasesScreenVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.Leases_Order_By> | Types.Leases_Order_By
	>;
	where?: Types.InputMaybe<Types.Leases_Bool_Exp>;
}>;

export type LeasesScreen = {
	__typename?: 'query_root';
	leases: Array<{
		__typename?: 'leases';
		id: number;
		deposit?: number | null | undefined;
		end_date?: string | null | undefined;
		is_expired?: boolean | null | undefined;
		is_signed?: boolean | null | undefined;
		license?: string | null | undefined;
		monthly_rent?: number | null | undefined;
		start_date?: string | null | undefined;
		tenant_id?: number | null | undefined;
		unit_id?: number | null | undefined;
	}>;
	agg: {
		__typename?: 'leases_aggregate';
		aggregate?:
			| { __typename?: 'leases_aggregate_fields'; count: number }
			| null
			| undefined;
	};
};

export const LeasesScreenDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'LeasesScreen' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'limit' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'offset' },
					},
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'order_by' },
					},
					type: {
						kind: 'ListType',
						type: {
							kind: 'NonNullType',
							type: {
								kind: 'NamedType',
								name: { kind: 'Name', value: 'leases_order_by' },
							},
						},
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'where' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'leases_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'leases' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'order_by' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'order_by' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'limit' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'limit' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'offset' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'offset' },
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'where' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'where' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'leaseDetails' },
								},
							],
						},
					},
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'agg' },
						name: { kind: 'Name', value: 'leases_aggregate' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'where' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'where' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{
									kind: 'Field',
									name: { kind: 'Name', value: 'aggregate' },
									selectionSet: {
										kind: 'SelectionSet',
										selections: [
											{ kind: 'Field', name: { kind: 'Name', value: 'count' } },
										],
									},
								},
							],
						},
					},
				],
			},
		},
		...LeaseDetails.definitions,
	],
} as unknown as DocumentNode<LeasesScreen, LeasesScreenVariables>;
export type LeasesScreenStore = OperationStore<
	LeasesScreen,
	LeasesScreenVariables
>;
