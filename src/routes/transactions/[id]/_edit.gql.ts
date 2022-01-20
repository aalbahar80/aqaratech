// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { TransactionById, TransactionDetails } from './_index.gql';
export type TransactionEditPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type TransactionEditPage = {
	__typename?: 'query_root';
	transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				amount?: number | null | undefined;
				created_at?: any | null | undefined;
				due_date?: string | null | undefined;
				is_paid?: boolean | null | undefined;
				lease_id?: number | null | undefined;
				memo?: string | null | undefined;
				receipt_url?: string | null | undefined;
				lease?:
					| {
							__typename?: 'leases';
							id: number;
							tenant_id?: number | null | undefined;
							unit?:
								| {
										__typename?: 'units';
										id: number;
										property?:
											| {
													__typename?: 'properties';
													id: number;
													client_id?: number | null | undefined;
											  }
											| null
											| undefined;
								  }
								| null
								| undefined;
							tenant?:
								| {
										__typename?: 'tenants';
										phone?: string | null | undefined;
										email?: string | null | undefined;
										user?:
											| {
													__typename?: 'users';
													phone?: string | null | undefined;
													email?: string | null | undefined;
											  }
											| null
											| undefined;
								  }
								| null
								| undefined;
					  }
					| null
					| undefined;
		  }
		| null
		| undefined;
};

export type UpdateTransactionVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.Transactions_Set_Input>;
}>;

export type UpdateTransaction = {
	__typename?: 'mutation_root';
	update_transactions_by_pk?:
		| {
				__typename?: 'transactions';
				id: number;
				amount?: number | null | undefined;
				created_at?: any | null | undefined;
				due_date?: string | null | undefined;
				is_paid?: boolean | null | undefined;
				lease_id?: number | null | undefined;
				memo?: string | null | undefined;
				receipt_url?: string | null | undefined;
		  }
		| null
		| undefined;
};

export const TransactionEditPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TransactionEditPage' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'FragmentSpread',
						name: { kind: 'Name', value: 'transactionById' },
					},
				],
			},
		},
		...TransactionById.definitions,
	],
} as unknown as DocumentNode<TransactionEditPage, TransactionEditPageVariables>;
export const UpdateTransactionDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateTransaction' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
					},
				},
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: '_set' } },
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'transactions_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_transactions_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'pk_columns' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'id' },
											value: {
												kind: 'Variable',
												name: { kind: 'Name', value: 'id' },
											},
										},
									],
								},
							},
							{
								kind: 'Argument',
								name: { kind: 'Name', value: '_set' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: '_set' },
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
				],
			},
		},
		...TransactionDetails.definitions,
	],
} as unknown as DocumentNode<UpdateTransaction, UpdateTransactionVariables>;
export type TransactionEditPageStore = OperationStore<
	TransactionEditPage,
	TransactionEditPageVariables
>;
export type UpdateTransactionStore = OperationStore<
	UpdateTransaction,
	UpdateTransactionVariables
>;
