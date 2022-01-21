// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { TransactionDetails } from './[id]/_index.gql';
export type TransactionListPageVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.Transactions_Order_By> | Types.Transactions_Order_By
	>;
	where?: Types.InputMaybe<Types.Transactions_Bool_Exp>;
}>;

export type TransactionListPage = {
	__typename?: 'query_root';
	transactions: Array<{
		__typename?: 'transactions';
		id: string;
		amount?: number | null | undefined;
		created_at?: any | null | undefined;
		due_date?: string | null | undefined;
		is_paid?: boolean | null | undefined;
		lease_id?: number | null | undefined;
		memo?: string | null | undefined;
		receipt_url?: string | null | undefined;
	}>;
	agg: {
		__typename?: 'transactions_aggregate';
		aggregate?:
			| { __typename?: 'transactions_aggregate_fields'; count: number }
			| null
			| undefined;
	};
};

export const TransactionListPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TransactionListPage' },
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
								name: { kind: 'Name', value: 'transactions_order_by' },
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
						name: { kind: 'Name', value: 'transactions_bool_exp' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'transactions' },
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
									name: { kind: 'Name', value: 'transactionDetails' },
								},
							],
						},
					},
					{
						kind: 'Field',
						alias: { kind: 'Name', value: 'agg' },
						name: { kind: 'Name', value: 'transactions_aggregate' },
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
		...TransactionDetails.definitions,
	],
} as unknown as DocumentNode<TransactionListPage, TransactionListPageVariables>;
export type TransactionListPageStore = OperationStore<
	TransactionListPage,
	TransactionListPageVariables
>;
