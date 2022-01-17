// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TrxPublicInfoVariables = Types.Exact<{
	_eq?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type TrxPublicInfo = {
	__typename?: 'query_root';
	transactions: Array<{
		__typename?: 'transactions';
		id: number;
		is_paid?: boolean | null | undefined;
		receipt_url?: string | null | undefined;
	}>;
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
					variable: { kind: 'Variable', name: { kind: 'Name', value: '_eq' } },
					type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
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
								name: { kind: 'Name', value: 'where' },
								value: {
									kind: 'ObjectValue',
									fields: [
										{
											kind: 'ObjectField',
											name: { kind: 'Name', value: 'id' },
											value: {
												kind: 'ObjectValue',
												fields: [
													{
														kind: 'ObjectField',
														name: { kind: 'Name', value: '_eq' },
														value: {
															kind: 'Variable',
															name: { kind: 'Name', value: '_eq' },
														},
													},
												],
											},
										},
									],
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
