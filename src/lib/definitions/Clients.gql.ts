// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ClientsInsertVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.clients_insert_input>;
}>;

export type ClientsInsert = {
	__typename?: 'mutation_root';
	insert_clients_one?:
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

export type ClientsUpdateVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.clients_set_input>;
}>;

export type ClientsUpdate = {
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

export type DeleteClientsVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteClients = {
	__typename?: 'mutation_root';
	delete_clients_by_pk?:
		| { __typename?: 'clients'; id: number }
		| null
		| undefined;
};

export type ClientsByIdVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type ClientsById = {
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

export type ClientsListVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.clients_order_by> | Types.clients_order_by
	>;
}>;

export type ClientsList = {
	__typename?: 'query_root';
	clients: Array<{
		__typename?: 'clients';
		id: number;
		first_name?: string | null | undefined;
		last_name?: string | null | undefined;
		email?: string | null | undefined;
		phone?: string | null | undefined;
		civilid?: any | null | undefined;
		is_active?: boolean | null | undefined;
	}>;
};

export const ClientsInsertDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'ClientsInsert' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'clients_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_clients_one' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
			},
		},
	],
} as unknown as DocumentNode<ClientsInsert, ClientsInsertVariables>;
export const ClientsUpdateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'ClientsUpdate' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
			},
		},
	],
} as unknown as DocumentNode<ClientsUpdate, ClientsUpdateVariables>;
export const DeleteClientsDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteClients' },
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
} as unknown as DocumentNode<DeleteClients, DeleteClientsVariables>;
export const ClientsByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'ClientsById' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
			},
		},
	],
} as unknown as DocumentNode<ClientsById, ClientsByIdVariables>;
export const ClientsListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'ClientsList' },
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
								name: { kind: 'Name', value: 'clients_order_by' },
							},
						},
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'clients' },
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
						],
						selectionSet: {
							kind: 'SelectionSet',
							selections: [
								{ kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
			},
		},
	],
} as unknown as DocumentNode<ClientsList, ClientsListVariables>;
export type ClientsInsertStore = OperationStore<
	ClientsInsert,
	ClientsInsertVariables
>;
export type ClientsUpdateStore = OperationStore<
	ClientsUpdate,
	ClientsUpdateVariables
>;
export type DeleteClientsStore = OperationStore<
	DeleteClients,
	DeleteClientsVariables
>;
export type ClientsByIdStore = OperationStore<
	ClientsById,
	ClientsByIdVariables
>;
export type ClientsListStore = OperationStore<
	ClientsList,
	ClientsListVariables
>;
