// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable */
import type * as Types from '../../../generated/graphql';

import type { OperationStore } from '@urql/svelte';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { PropertyById, PropertyDetails } from './_index.gql';
export type PropertyEditPageVariables = Types.Exact<{
	id: Types.Scalars['Int'];
}>;

export type PropertyEditPage = {
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

export type UpdatePropertyVariables = Types.Exact<{
	id: Types.Scalars['Int'];
	_set?: Types.InputMaybe<Types.Properties_Set_Input>;
}>;

export type UpdateProperty = {
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

export const PropertyEditPageDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'query',
			name: { kind: 'Name', value: 'PropertyEditPage' },
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
						name: { kind: 'Name', value: 'propertyById' },
					},
				],
			},
		},
		...PropertyById.definitions,
	],
} as unknown as DocumentNode<PropertyEditPage, PropertyEditPageVariables>;
export const UpdatePropertyDocument = {
	kind: 'Document',
	definitions: [
		{
			kind: 'OperationDefinition',
			operation: 'mutation',
			name: { kind: 'Name', value: 'UpdateProperty' },
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
								{
									kind: 'FragmentSpread',
									name: { kind: 'Name', value: 'propertyDetails' },
								},
							],
						},
					},
				],
			},
		},
		...PropertyDetails.definitions,
	],
} as unknown as DocumentNode<UpdateProperty, UpdatePropertyVariables>;
export type PropertyEditPageStore = OperationStore<
	PropertyEditPage,
	PropertyEditPageVariables
>;
export type UpdatePropertyStore = OperationStore<
	UpdateProperty,
	UpdatePropertyVariables
>;
