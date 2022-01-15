// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { ClientById, ClientDetails } from './_index.gql';
export type ClientEditPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type ClientEditPage = {
	__typename?: 'query_root';
	clients_by_pk?:
		| {
				__typename?: 'clients';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				civilid?: any | null | undefined;
				is_active?: boolean | null | undefined;
		  }
		| null
		| undefined;
};

export type UpdateClientVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.Clients_Set_Input>;
}>;

export type UpdateClient = {
	__typename?: 'mutation_root';
	update_clients_by_pk?:
		| {
				__typename?: 'clients';
				id: number;
				first_name?: string | null | undefined;
				last_name?: string | null | undefined;
				email?: string | null | undefined;
				phone?: string | null | undefined;
				civilid?: any | null | undefined;
				is_active?: boolean | null | undefined;
		  }
		| null
		| undefined;
};

export const ClientEditPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'ClientEditPage' },
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
						name: { kind: 'Name', value: 'clientById' },
					},
				],
			},
		},
		...ClientById.definitions,
	],
} as unknown as DocumentNode<ClientEditPage, ClientEditPageVariables>;
export const UpdateClientDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateClient' },
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
						name: { kind: 'Name', value: 'clients_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_clients_by_pk' },
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
									name: { kind: 'Name', value: 'clientDetails' },
								},
							],
						},
					},
				],
			},
		},
		...ClientDetails.definitions,
	],
} as unknown as DocumentNode<UpdateClient, UpdateClientVariables>;
export type ClientEditPageStore = OperationStore<
	ClientEditPage,
	ClientEditPageVariables
>;
export type UpdateClientStore = OperationStore<
	UpdateClient,
	UpdateClientVariables
>;
