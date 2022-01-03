// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PropertiesInsertVariables = Types.Exact<{
	object?: Types.InputMaybe<Types.properties_insert_input>;
}>;

export type PropertiesInsert = {
	__typename?: 'mutation_root';
	insert_properties_one?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
				area?: string | null | undefined;
				block?: string | null | undefined;
				street?: string | null | undefined;
				avenue?: string | null | undefined;
				number?: string | null | undefined;
				coordinates?: any | null | undefined;
		  }
		| null
		| undefined;
};

export type PropertiesUpdateVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.properties_set_input>;
}>;

export type PropertiesUpdate = {
	__typename?: 'mutation_root';
	update_properties_by_pk?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
				area?: string | null | undefined;
				block?: string | null | undefined;
				street?: string | null | undefined;
				avenue?: string | null | undefined;
				number?: string | null | undefined;
				coordinates?: any | null | undefined;
		  }
		| null
		| undefined;
};

export type DeletePropertiesVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type DeleteProperties = {
	__typename?: 'mutation_root';
	delete_properties_by_pk?:
		| { __typename?: 'properties'; id: number }
		| null
		| undefined;
};

export type PropertiesByIdVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type PropertiesById = {
	__typename?: 'query_root';
	properties_by_pk?:
		| {
				__typename?: 'properties';
				id: number;
				client_id?: number | null | undefined;
				area?: string | null | undefined;
				block?: string | null | undefined;
				street?: string | null | undefined;
				avenue?: string | null | undefined;
				number?: string | null | undefined;
				coordinates?: any | null | undefined;
		  }
		| null
		| undefined;
};

export type PropertiesListVariables = Types.Exact<{
	limit?: Types.InputMaybe<Types.Scalars['Int']>;
	offset?: Types.InputMaybe<Types.Scalars['Int']>;
	order_by?: Types.InputMaybe<
		Array<Types.properties_order_by> | Types.properties_order_by
	>;
}>;

export type PropertiesList = {
	__typename?: 'query_root';
	properties: Array<{
		__typename?: 'properties';
		id: number;
		client_id?: number | null | undefined;
		area?: string | null | undefined;
		block?: string | null | undefined;
		street?: string | null | undefined;
		avenue?: string | null | undefined;
		number?: string | null | undefined;
		coordinates?: any | null | undefined;
	}>;
};

export const PropertiesInsertDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'PropertiesInsert' },
			variableDefinitions: [
				{
					kind: 'VariableDefinition',
					variable: {
						kind: 'Variable',
						name: { kind: 'Name', value: 'object' },
					},
					type: {
						kind: 'NamedType',
						name: { kind: 'Name', value: 'properties_insert_input' },
					},
					defaultValue: { kind: 'ObjectValue', fields: [] },
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'insert_properties_one' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'area' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'block' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'street' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'avenue' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<PropertiesInsert, PropertiesInsertVariables>;
export const PropertiesUpdateDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'PropertiesUpdate' },
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
						name: { kind: 'Name', value: 'properties_set_input' },
					},
				},
			],
			selectionSet: {
				kind: 'SelectionSet',
				selections: [
					{
						kind: 'Field',
						name: { kind: 'Name', value: 'update_properties_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'area' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'block' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'street' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'avenue' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<PropertiesUpdate, PropertiesUpdateVariables>;
export const DeletePropertiesDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'DeleteProperties' },
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
						name: { kind: 'Name', value: 'delete_properties_by_pk' },
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
} as unknown as DocumentNode<DeleteProperties, DeletePropertiesVariables>;
export const PropertiesByIdDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PropertiesById' },
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
						name: { kind: 'Name', value: 'properties_by_pk' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'area' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'block' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'street' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'avenue' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<PropertiesById, PropertiesByIdVariables>;
export const PropertiesListDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PropertiesList' },
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
								name: { kind: 'Name', value: 'properties_order_by' },
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
						name: { kind: 'Name', value: 'properties' },
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
								{ kind: 'Field', name: { kind: 'Name', value: 'client_id' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'area' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'block' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'street' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'avenue' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'number' } },
								{ kind: 'Field', name: { kind: 'Name', value: 'coordinates' } },
							],
						},
					},
				],
			},
		},
	],
} as unknown as DocumentNode<PropertiesList, PropertiesListVariables>;
export type PropertiesInsertStore = OperationStore<
	PropertiesInsert,
	PropertiesInsertVariables
>;
export type PropertiesUpdateStore = OperationStore<
	PropertiesUpdate,
	PropertiesUpdateVariables
>;
export type DeletePropertiesStore = OperationStore<
	DeleteProperties,
	DeletePropertiesVariables
>;
export type PropertiesByIdStore = OperationStore<
	PropertiesById,
	PropertiesByIdVariables
>;
export type PropertiesListStore = OperationStore<
	PropertiesList,
	PropertiesListVariables
>;
