// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ClientDetails = {
	__typename?: 'clients';
	id: number;
	full_name?: string | null | undefined;
	first_name?: string | null | undefined;
	last_name?: string | null | undefined;
	email?: string | null | undefined;
	phone?: string | null | undefined;
	civilid?: any | null | undefined;
	is_active?: boolean | null | undefined;
};

export type ClientDetailsVariables = Types.Exact<{ [key: string]: never }>;

export type ClientDetailPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type ClientDetailPage = {
	__typename?: 'query_root';
	clients_by_pk?:
		| {
				__typename?: 'clients';
				id: number;
				full_name?: string | null | undefined;
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

export type ClientById = {
	__typename?: 'query_root';
	clients_by_pk?:
		| {
				__typename?: 'clients';
				id: number;
				full_name?: string | null | undefined;
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

export type ClientByIdVariables = Types.Exact<{ [key: string]: never }>;

export type DeleteClientVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteClient = {
	__typename?: 'mutation_root';
	delete_clients_by_pk?:
		| { __typename?: 'clients'; id: number }
		| null
		| undefined;
};

export const ClientDetails = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'clientDetails' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'clients' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'full_name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'first_name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'last_name' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'email' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'phone' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'civilid' } },
					{ kind: 'Field', name: { kind: 'Name', value: 'is_active' } },
				],
			},
		},
	],
} as unknown as DocumentNode<ClientDetails, ClientDetailsVariables>;
export const ClientById = {
	kind: 'Document',
	definitions: [
		{
			kind: 'FragmentDefinition',
			name: { kind: 'Name', value: 'clientById' },
			typeCondition: {
				kind: 'NamedType',
				name: { kind: 'Name', value: 'query_root' },
			},
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'clients_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
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
} as unknown as DocumentNode<ClientById, ClientByIdVariables>;
export const ClientDetailPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'ClientDetailPage' },
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
} as unknown as DocumentNode<ClientDetailPage, ClientDetailPageVariables>;
export const DeleteClientDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteClient' },
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
						kind: 'Field',
						name: { kind: 'Name', value: 'delete_clients_by_pk' },
						arguments: [
							{
								kind: 'Argument',
								name: { kind: 'Name', value: 'id' },
								value: {
									kind: 'Variable',
									name: { kind: 'Name', value: 'id' },
								},
							},
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<DeleteClient, DeleteClientVariables>;
export type ClientDetailPageStore = OperationStore<
	ClientDetailPage,
	ClientDetailPageVariables
>;
export type DeleteClientStore = OperationStore<
	DeleteClient,
	DeleteClientVariables
>;
