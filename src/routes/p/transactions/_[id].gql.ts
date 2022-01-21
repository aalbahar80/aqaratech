// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TrxPublicInfoVariables = Types.Exact<{
	uuid: Types.Scalars['uuid'];
}>;

export type TrxPublicInfo = {
	__typename?: 'query_root';
	transactions_by_pk?:
		| {
				__typename?: 'transactions';
				uuid: string;
				is_paid?: boolean | null | undefined;
				receipt_url?: string | null | undefined;
		  }
		| null
		| undefined;
};

export const TrxPublicInfoDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'TrxPublicInfo' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: { kind: 'Variable', name: { kind: 'Name', value: 'uuid' } },
					type: {
						kind: 'NonNullType',
						type: { kind: 'NamedType', name: { kind: 'Name', value: 'uuid' } },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'transactions_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'uuid' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'uuid' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'uuid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'is_paid' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'receipt_url' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<TrxPublicInfo, TrxPublicInfoVariables>;
export type TrxPublicInfoStore = OperationStore<
	TrxPublicInfo,
	TrxPublicInfoVariables
>;
