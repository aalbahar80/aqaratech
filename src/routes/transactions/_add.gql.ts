// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { TransactionDetails } from './[id]/_index.gql';
export type AddTransactionVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.Transactions_Insert_Input>;
}>;

export type AddTransaction = {
	__typename?: 'mutation_root';
	insert_transactions_one?:
		| {
				__typename?: 'transactions';
				id: number;
				uuid: string;
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

export const AddTransactionDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'AddTransaction' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'transactions_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_transactions_one' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'object' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'object' },
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
} as unknown as DocumentNode<AddTransaction, AddTransactionVariables>;
export type AddTransactionStore = OperationStore<
	AddTransaction,
	AddTransactionVariables
>;
